import { css } from '@styled-system/css';

export function Box() {
  return (
    <>
      <h1
        className={css({
          bg: 'red.300',
          fontFamily: 'Inter',
          px: '4',
          py: '3',
          borderRadius: 'md',
          _hover: { bg: 'red.400' },
        })}
      >
        Box
      </h1>
    </>
  );
}
