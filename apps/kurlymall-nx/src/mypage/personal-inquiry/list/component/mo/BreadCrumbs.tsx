import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import ArrowRight from '../../../../../shared/components/icons/ArrowRight';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Text = styled.span({
  fontSize: '0.813rem',
  color: '#999999',
});

const styles = {
  arrow: {
    ':last-of-type': {
      display: 'none',
    },
  },
};

interface Props {
  category: string;
  subCategory: string;
  className?: string;
}

export default function BreadCrumbs({ category, subCategory, className }: Props) {
  return (
    <Container className={className}>
      <Text>{category}</Text>
      {!isEmpty(subCategory) && (
        <>
          <ArrowRight css={styles.arrow} />
          <Text>{subCategory}</Text>
        </>
      )}
    </Container>
  );
}
