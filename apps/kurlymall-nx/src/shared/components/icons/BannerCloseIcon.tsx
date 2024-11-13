import styled from '@emotion/styled';

export default styled.span<{ theme: 'white' | 'black'; isPc: boolean }>(
  ({ theme, isPc }) => `
  display: inline-block;
  width: ${isPc ? '42px' : '38px'};
  height: ${isPc ? '42px' : '38px'};
  background-image: ${
    theme === 'white'
      ? 'url(https://res.kurly.com/pc/ico/1908/ico_arrow_fff_84x84.png)'
      : 'url(https://res.kurly.com/pc/ico/1908/ico_arrow_333_84x84.png)'
  };
  background-size: ${isPc ? '42px 42px' : '38px 38px'};
  background-position: center;
  background-repeat: no-repeat;
`,
);
