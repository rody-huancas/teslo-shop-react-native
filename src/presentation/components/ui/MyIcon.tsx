import { Icon, useTheme } from '@ui-kitten/components';
import { ImageProps, StyleSheet } from 'react-native';

interface Props {
  name  : string;
  color?: string;
  white?: boolean;
}

export const MyIcon = ({ name, color, white = false, ...rest }: Props & Partial<ImageProps>) => {
  const theme = useTheme();

  let iconColor = color;
  
  if (white) {
    iconColor = theme['color-info-100'];
  } else if (!color) {
    iconColor = theme['text-basic-color'];
  } else {
    iconColor = theme[color] ?? theme['text-basic-color'];
  }

  return (
    <Icon 
      {...rest}
      style={[rest.style, styles.icon]} 
      fill={iconColor} 
      name={name} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width : 30,
    height: 30,
  },
});
