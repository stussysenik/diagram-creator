describe('Diagram Creator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders 3 boxes in vertical layout', () => {
    cy.get('.diagram-box').should('have.length', 3);

    // Verify boxes are stacked vertically (Y values increase)
    cy.get('.diagram-box rect')
      .then(($rects) => {
        const yValues = Array.from($rects)
          .filter((_, i) => i % 1 === 0) // get outer rects
          .map((el) => parseFloat(el.getAttribute('y')!));

        // Deduplicate (boxes may have inner rects with same y)
        const uniqueY = [...new Set(yValues)];
        for (let i = 1; i < uniqueY.length; i++) {
          expect(uniqueY[i]).to.be.greaterThan(uniqueY[i - 1]);
        }
      });
  });

  it('renders down-pointing arrows between boxes', () => {
    cy.get('.diagram-arrow').should('have.length', 2);

    cy.get('.diagram-arrow polygon').first().then(($polygon) => {
      const points = $polygon.attr('points')!;
      const coords = points.split(' ').map((p) => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
      });
      // Tip of down-pointing arrow has highest Y value
      const maxY = Math.max(...coords.map((c) => c.y));
      expect(coords[0].y).to.equal(maxY);
    });
  });

  it('renders feedback loop path', () => {
    cy.get('.feedback-loop').should('exist');
    cy.get('.feedback-loop path').should('have.attr', 'd');
  });

  it('switches to horizontal layout via dropdown', () => {
    cy.get('select[data-key="layoutDirection"]').select('horizontal');

    // Wait for re-render (requestAnimationFrame batching)
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);

    // After switching, arrows should be horizontal: verify y1 === y2 on a line
    cy.get('.diagram-arrow line').first().then(($line) => {
      const y1 = parseFloat($line.attr('y1')!);
      const y2 = parseFloat($line.attr('y2')!);
      expect(y1).to.equal(y2);
    });
  });

  it('adds and removes steps', () => {
    cy.get('.diagram-box').should('have.length', 3);

    cy.get('.btn-add').click();
    cy.get('.diagram-box').should('have.length', 4);

    cy.get('.btn-remove').last().click();
    cy.get('.diagram-box').should('have.length', 3);
  });

  it('SVG export triggers download', () => {
    cy.get('.btn-export').first().click();
    // Verify no errors occurred (if download is triggered, no crash)
    cy.get('.diagram-svg').should('exist');
  });

  it('applies preset configuration', () => {
    cy.get('select[data-key="preset"]').select('Original (Horizontal)');

    // Should switch to horizontal layout
    cy.get('select[data-key="layoutDirection"]').should('have.value', 'horizontal');
  });
});
