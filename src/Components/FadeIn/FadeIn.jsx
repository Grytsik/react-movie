import { useSpring, animated, config } from 'react-spring';

export default function FadeIn({ children, loading }) {
  const fadeInAnimation = useSpring({
    opacity: loading ? 0 : 1,
    from: { opacity: loading ? 1 : 0 },
    config: config.wobbly,
  });

  return <animated.div style={fadeInAnimation}>{children}</animated.div>;
}
