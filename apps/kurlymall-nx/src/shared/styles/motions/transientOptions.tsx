import { CreateStyled } from '@emotion/styled';

/**
 * styled-components 5.1.0에 추가 된 transient props를 emotion/styled에서 사용합니다.
 * See also: https://github.com/styled-components/styled-components/pull/3052
 */
export const transientOptions: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};
