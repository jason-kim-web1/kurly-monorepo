import styled from '@emotion/styled';

import Lottie, { LottieProps } from 'react-lottie-player';

import { useInView } from 'react-intersection-observer';
import { ForwardedRef, forwardRef, Ref, useMemo } from 'react';

import { Typography } from '@thefarmersfront/kpds-react';

import Link from 'next/link';

import { vars } from '@thefarmersfront/kpds-css';

import NextImage from '../../../../shared/components/NextImage';
import { useCategoryQuickMenuVisited } from '../../../hooks/useCategoryQuickMenuVisited';
import { PrimaryCategory } from '../../../../shared/reducers/category';
import { getCategorySiteLink, getParsedLink } from '../../../shared/util/link';
import { useAppSelector } from '../../../../shared/store';
import { logSelectQuickMenu } from '../../../amplitude/events';

interface LottieContainerProps extends Pick<PrimaryCategory, 'mobileLottieUrl' | 'mobileLottieLoop'> {
  inView: boolean;
}

interface QuickMenuItemProps
  extends Pick<
    PrimaryCategory,
    'kind' | 'code' | 'mobileLink' | 'isNew' | 'mobileLottieUrl' | 'mobileLottieLoop' | 'mobileIconV2Url' | 'name'
  > {
  index: number;
  imageWrapperRef: Ref<HTMLElement>;
}

const Wrapper = styled.div`
  text-align: center;
`;

const ImageWrapper = styled.figure`
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  width: auto;

  > * {
    vertical-align: top;
  }
`;

const RedDot = styled.span`
  position: absolute;
  top: 0px;
  right: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${vars.color.background.$background1};

  ::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: ${vars.color.main.$tertiary};
    z-index: 1;
  }
`;

const Title = styled(Typography)`
  margin-top: ${vars.spacing.$8};
  width: 64px;
  overflow: hidden;
  white-space: nowrap;
`;

const A = styled.a`
  text-align: center;
`;

const QuickMenuImage = styled(NextImage)`
  border-radius: ${vars.radius.$16};
`;

const QuickMenuLottie = styled(Lottie)`
  width: 48px;
  height: 48px;
  border-radius: ${vars.radius.$16};
`;

function LottieContainer({ mobileLottieLoop, mobileLottieUrl, inView }: LottieContainerProps) {
  const lottieProps: LottieProps = {
    loop: mobileLottieLoop ? mobileLottieLoop - 1 : true,
    play: inView,
    path: mobileLottieUrl,
  };

  return <QuickMenuLottie {...lottieProps} />;
}

const QuickMenuItemImpl = (
  {
    kind,
    code,
    mobileLink,
    isNew,
    mobileLottieUrl,
    mobileLottieLoop,
    mobileIconV2Url,
    name,
    index,
    imageWrapperRef,
  }: QuickMenuItemProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const { ref: wrapperRef, inView } = useInView();
  const mainSite = useAppSelector(({ main }) => main.site);
  const [visited, setVisited] = useCategoryQuickMenuVisited(`${kind}-${code}`);

  const { isExternal, link } = useMemo(() => {
    if (kind === 'url') {
      return getParsedLink(mobileLink);
    }

    return { isExternal: false, link: getCategorySiteLink({ kind, code, mainSite }) };
  }, [code, kind, mainSite, mobileLink]);

  const handleSelectQuickMenuItem = () => {
    setVisited();
    logSelectQuickMenu({
      selection_type: 'main_category_quick_menu',
      item_position: index + 1,
      item_policy: `${kind},${code}`,
      content_title: name,
      url: kind === 'url' ? link.replace(/^\/m\//, '/') : null,
    });
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Link href={link} passHref>
        <A
          ref={ref}
          href={link}
          target={isExternal ? '_blank' : '_self'}
          rel="noreferrer"
          onClick={handleSelectQuickMenuItem}
        >
          <ImageWrapper ref={imageWrapperRef}>
            {mobileLottieUrl ? (
              <LottieContainer inView={inView} mobileLottieUrl={mobileLottieUrl} mobileLottieLoop={mobileLottieLoop} />
            ) : (
              <QuickMenuImage
                src={mobileIconV2Url ?? ''}
                alt={''}
                layout="fixed"
                objectFit="cover"
                width={48}
                height={48}
              />
            )}
            {isNew && !visited ? <RedDot /> : null}
          </ImageWrapper>
          <Title as={'p'} variant={'$smallSemibold'}>
            {name}
          </Title>
        </A>
      </Link>
    </Wrapper>
  );
};

const QuickMenuItem = forwardRef(QuickMenuItemImpl);

export { QuickMenuItem };
