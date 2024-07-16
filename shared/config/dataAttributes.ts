import { defineDataAttributesConfig } from './lib/defineDataAttributesConfig';

export const DATA_ATTRIBUTES_CONFIG = defineDataAttributesConfig({
  flags: {
    isColorSchemeLight: 'data-color-scheme-light',
    isColorSchemeDark: 'data-color-scheme-dark',
    isLoading: 'data-loading',
    isHovered: 'data-hovered',
    isSelected: 'data-selected',
    isPressed: 'data-pressed',
    isFocused: 'data-focused',
    isDisabled: 'data-disabled',
    isEmpty: 'data-empty',
    isOpen: 'data-open',
    isError: 'data-error',
    isChecked: 'data-checked',
    isDragging: 'data-dragging',
  },
});
