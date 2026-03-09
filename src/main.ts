import './styles/main.css';
import { createLayout } from './ui/layout';
import { buildControls } from './ui/controls';
import { render } from './renderer/svg-renderer';
import { store } from './state';

const { sidebar, preview } = createLayout();

// Initial render
render(store.get(), preview);

// Re-render on state changes
store.subscribe((config) => {
  render(config, preview);
});

// Build sidebar controls
buildControls(sidebar);
