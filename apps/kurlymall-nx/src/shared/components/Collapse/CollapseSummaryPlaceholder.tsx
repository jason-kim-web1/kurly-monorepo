import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';

export default styled.div({
  margin: '0 12px',
  fontSize: 15,
  fontWeight: 'normal',
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: COLOR.placeholder,
});
