import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';

const WrappedTag = styled.div`
  width: 49px;
  height: 17px;
  color: ${COLOR.loversLavender};
  border: 1px solid ${COLOR.loversLavender};
  border-radius: 20px;
  font-size: 10px;
  line-height: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type KurlyNowTagProps = {
  style?: Record<string, string | number>;
  className?: string;
};

function KurlyNowTag({ style, className }: KurlyNowTagProps) {
  return (
    <WrappedTag style={style} className={className}>
      컬리나우
    </WrappedTag>
  );
}

export default KurlyNowTag;
