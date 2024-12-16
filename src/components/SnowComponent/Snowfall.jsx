import styled, { keyframes } from 'styled-components';

// Keyframes for falling and shaking effects
const fallAnimation = keyframes`
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
`;

const shakeAnimation = keyframes`
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(80px);
  }
  100% {
    transform: translateX(0px);
  }
`;

// Styled component for the snowflake container
const Snowflake = styled.div`
  position: fixed;
  top: -10%;
  z-index: 9999;
  color: #fff ;
  user-select: none;
  cursor: default;
  animation: ${fallAnimation} 10s linear infinite, ${shakeAnimation} 3s ease-in-out infinite;

  font-size: ${(props) => props.size || '30px'};
  left: ${(props) => props.left || '0%'};
  animation-delay: ${(props) => props.fallDelay || '0s'}, ${(props) => props.shakeDelay || '0s'};
`;

// Example component rendering snowflakes
const Snowfall = () => {
  const snowflakes = [
    { size: '16px', left: '1%', fallDelay: '0s', shakeDelay: '0s' },
    { size: '11px', left: '10%', fallDelay: '1s', shakeDelay: '1s' },
    { size: '18px', left: '15%', fallDelay: '7s', shakeDelay: '1s' },
    { size: '13px', left: '20%', fallDelay: '6s', shakeDelay: '0.5s' },
    { size: '12px', left: '30%', fallDelay: '4s', shakeDelay: '2s' },
    { size: '18px', left: '35%', fallDelay: '3s', shakeDelay: '1s' },
    { size: '10px', left: '40%', fallDelay: '2s', shakeDelay: '2s' },
    { size: '10px', left: '45%', fallDelay: '4.5s', shakeDelay: '1.5s' },
    { size: '10px', left: '50%', fallDelay: '5.3s', shakeDelay: '3s' },
    { size: '18px', left: '60%', fallDelay: '6s', shakeDelay: '2s' },
    { size: '11px', left: '65%', fallDelay: '9s', shakeDelay: '2s' },
    { size: '18px', left: '70%', fallDelay: '2.5s', shakeDelay: '1s' },
    { size: '10px', left: '80%', fallDelay: '1s', shakeDelay: '0s' },
    { size: '18px', left: '85%', fallDelay: '3.5s', shakeDelay: '0s' },
    { size: '13px', left: '90%', fallDelay: '3s', shakeDelay: '1.5s' },
  ];

  return (
    <div>
      {snowflakes.map((flake, index) => (
        <Snowflake
          key={index}
          size={flake.size}
          left={flake.left}
          fallDelay={flake.fallDelay}
          shakeDelay={flake.shakeDelay}
        >
          ❅
        </Snowflake>
      ))}
    </div>
  );
};

export default Snowfall;