import styled from '@emotion/styled';

import { mq } from '../../styles';

import COLOR from '../../constant/colorset';

export const PopupHeader = styled.div(
  mq({
    padding: ['24px 24px 0 24px', '24px 30px 0 30px'],
    fontSize: 18,
    fontWeight: [600, 500],
    textAlign: 'left',
    color: `${COLOR.kurlyGray800}`,
  }),
);

export const PopupContent = styled.div<{ withoutTitle: boolean }>(({ withoutTitle }) =>
  mq({
    padding: withoutTitle ? ['24px 24px 0 24px', '40px 30px 40px 30px'] : ['0 24px 0 24px', '24px 30px 40px 30px'],
    fontSize: withoutTitle ? [16, 16] : 16,
    fontWeight: withoutTitle ? 500 : 'normal',
    textAlign: withoutTitle ? ['left', 'center'] : 'center',
    color: `${COLOR.kurlyGray800}`,
    lineHeight: '21px',
    marginTop: withoutTitle ? [0] : ['16px', 0],
    whiteSpace: 'pre-line',
    letterSpacing: [0, '-0.5px'],
  }),
);

export const PopupButton = styled.button<{ weight?: number }>(({ weight }) =>
  mq({
    width: ['auto', '100%'],
    height: '100%',
    border: 'none',
    padding: ['0 18px', '0'],
    fontSize: '16px',
    fontWeight: [weight, 500],
    color: `${COLOR.kurlyPurple}`,
    background: 'transparent',
    '&:not(:first-of-type)': {
      borderLeft: ['none', `1px solid ${COLOR.bgLightGray}`],
      marginLeft: ['8px', 0],
    },
  }),
);

export const Popupfooter = styled.div(
  mq({
    height: 56,
    borderTop: ['none', `1px solid ${COLOR.bgLightGray}`],
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    display: 'flex',
    justifyContent: ['flex-end', 'flex-start'],
    padding: ['0 8px', 0],
    marginTop: ['16px', 0],
  }),
);
