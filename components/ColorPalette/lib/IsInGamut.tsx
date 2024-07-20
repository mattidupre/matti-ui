import { Typography } from '../../Typography';

export type IsInGamutProps = {
  isInGamut: boolean;
};

export function IsInGamut({ isInGamut }: IsInGamutProps) {
  return (
    <Typography variant="ui">
      {isInGamut ? 'In gamut' : 'Not in gamut'}
    </Typography>
  );
}
