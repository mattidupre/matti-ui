import type { DataAttributeFlagsConfig } from './entities';

export const DATA_ATTRIBUTE_FLAGS = {
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
} as const satisfies DataAttributeFlagsConfig;
