import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { times } from 'lodash';

import styled from '@emotion/styled';

import Skeleton from 'react-loading-skeleton';

import Faq from './Faq';
import { loadFaqs } from '../slice';
import { AppState } from '../../../shared/store';

const Faqs = styled.div({
  backgroundColor: 'white',
  marginTop: '10px',
});

const SkeletonContainer = styled.div({
  marginTop: '10px',
});

const Container = styled.div({
  padding: '20px 20px',
  backgroundColor: 'white',
  display: 'flex',
});

const Wrap = styled.div({
  width: '100%',
  paddingTop: '2px',
  marginLeft: '10px',
  lineHeight: 1.33,
});

export default function FaqsContainer() {
  const dispatch = useDispatch();
  const { faqs, isLoading, category } = useSelector(({ faq }: AppState) => faq);

  useEffect(() => {
    dispatch(loadFaqs());
  }, [category, dispatch]);

  return (
    <div>
      {isLoading && (
        <SkeletonContainer>
          {times(10, (i) => (
            <Container key={`${i}x`}>
              <Skeleton circle width="24px" height="24px" />
              <Wrap>
                <Skeleton count={2} />
              </Wrap>
            </Container>
          ))}
        </SkeletonContainer>
      )}
      {!isLoading && (
        <Faqs>
          {faqs.map((faq) => (
            <Faq key={faq.no} question={faq.question} answer={faq.answer} selected={faq.selected} no={faq.no} />
          ))}
        </Faqs>
      )}
    </div>
  );
}
