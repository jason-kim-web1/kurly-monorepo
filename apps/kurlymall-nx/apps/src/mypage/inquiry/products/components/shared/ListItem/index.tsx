import { CSSProperties, forwardRef, Ref, useEffect, useMemo } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';
import { getFormattedDate } from '../../../../../../shared/utils/date';
import type { InquiryProductItem } from '../../../services';
import { RESOURCE_URL } from '../../../../../../shared/configs/config';

import NextImage from '../../../../../../shared/components/NextImage';
import { useWebview } from '../../../../../../shared/hooks';
import deepLinkUrl from '../../../../../../shared/constant/deepLink';

type Props = InquiryProductItem & {
  style?: CSSProperties;
  onClick(): void;
  onClickEdit(): void;
  onClickDelete(): void;
  expanded: boolean;
  measure(): void;
};

const Container = styled.li`
  > .inquiry-product-info {
    position: relative;
    -webkit-tap-highlight-color: transparent;
    text-align: left;
    width: 100%;
    background-color: ${COLOR.kurlyWhite};
    padding: 16px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    > .product-info-wrap {
      > .product-name {
        max-width: 70vw;
        overflow: hidden;
        margin-bottom: 4px;
        font-size: 13px;
        line-height: 20px;
        color: ${COLOR.kurlyGray450};
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > .inquiry-subject {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 6px;
        > .subject-text {
          overflow: hidden;
          max-width: 60vw;
          font-size: 15px;
          line-height: 18px;
          font-weight: 400;
          color: ${COLOR.kurlyGray800};
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      > .status-and-created-at {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: ${COLOR.kurlyGray450};
        line-height: 16px;
        font-size: 13px;
        > .status-text {
          color: ${COLOR.kurlyGray450};
          &.commented {
            color: ${COLOR.kurlyPurple};
          }
        }
        > .text-divider {
          margin: 3px 6px 0;
          width: 1px;
          height: 10px;
          background-color: ${COLOR.kurlyGray250};
        }
        > .created-at-text {
          font-size: 13px;
        }
      }
    }
    > .product-image-wrap {
      display: block;
      border-radius: 6px;
      overflow: hidden;
      width: 60px;
      height: 60px;
    }
  }
  > .divider-wrap {
    padding: 0 16px;
    width: 100%;
    height: 1px;
    background-color: ${COLOR.kurlyWhite};
    > .divider {
      width: 100%;
      height: 100%;
      background-color: ${COLOR.bg};
      border: none;
    }
  }
  > .row-inquiry-detail {
    background-color: ${COLOR.kurlyGray100};
    height: 0;
    overflow: hidden;
    text-align: left;
    > .inquiry-detail-content {
      padding: 20px;
      > .content-row {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        > .icon-wrap {
          flex-shrink: 0;
        }
        > .subject {
          margin-left: 12px;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0;
          min-height: 24px;
          word-break: break-all;
        }
      }
      > .actions-wrap {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        > .btn-text {
          position: relative;
          padding: 0 11px;
          line-height: 20px;
          border: 0;
          background: none;
          color: ${COLOR.kurlyGray450};
          -webkit-tap-highlight-color: transparent;
          &:last-child {
            padding-right: 0;
            &::before {
              position: absolute;
              top: 5px;
              left: 0;
              width: 1px;
              height: 12px;
              background: #eee;
              vertical-align: top;
              content: '';
            }
          }
        }
      }
    }
  }
`;

const ListItem = (props: Props, ref: Ref<HTMLLIElement>) => {
  const {
    listImageUrl,
    style,
    contentProductName,
    subject,
    createdAtTimestamp,
    contents,
    expanded,
    isSecret,
    comments,
    commentsCount,
    contentProductNo,
    isMyPost,
    onClick,
    onClickEdit,
    onClickDelete,
    measure,
  } = props;
  const webview = useWebview();
  const isCommented = commentsCount > 0;
  const productDetailLink = useMemo(
    () => (webview ? `${deepLinkUrl.PRODUCT}${contentProductNo}` : `/goods/${contentProductNo}`),
    [contentProductNo, webview],
  );

  useEffect(() => {
    measure();
  }, [measure, expanded]);

  return (
    <Container style={style} ref={ref}>
      <button type="button" className="inquiry-product-info" onClick={onClick}>
        <div className="product-info-wrap">
          <div className="product-name">{contentProductName}</div>
          <div className="inquiry-subject">
            <p className="subject-text">{subject}</p>
            {isSecret ? (
              <NextImage
                layout="fixed"
                width={22}
                height={22}
                src={`${RESOURCE_URL}/kurly/ico/2021/secret_22_22_black.svg`}
                alt={contentProductName}
              />
            ) : null}
          </div>
          <div className="status-and-created-at">
            <span className={`status-text ${isCommented ? 'commented' : ''}`}>
              {isCommented ? '답변완료' : '답변대기'}
            </span>
            <span className="text-divider" />
            <span className="created-at-text">{getFormattedDate(createdAtTimestamp * 1000, 'yyyy.MM.dd')}</span>
          </div>
        </div>
        <Link href={productDetailLink} prefetch={false} passHref>
          <a href={productDetailLink} className="product-image-wrap">
            <NextImage
              layout="fixed"
              width={60}
              height={60}
              src={listImageUrl}
              alt={contentProductName}
              objectFit="cover"
              objectPosition="center"
            />
          </a>
        </Link>
      </button>
      {!expanded ? (
        <div className="divider-wrap">
          <hr className="divider" />
        </div>
      ) : null}
      <div className="row-inquiry-detail" style={{ height: expanded ? 'auto' : '0' }}>
        <div className="inquiry-detail-content">
          <div className="content-row">
            <div className="icon-wrap">
              <NextImage
                layout="fixed"
                src={`${RESOURCE_URL}/kurly/ico/2021/question_24_24_purple.svg`}
                width={24}
                height={24}
                alt="질문"
              />
            </div>
            <p className="subject">{contents}</p>
          </div>
          {isCommented
            ? comments.map((comment) => {
                return (
                  <div key={comment.id} className="content-row">
                    <div className="icon-wrap">
                      <NextImage
                        layout="fixed"
                        src={`${RESOURCE_URL}/kurly/ico/2021/answer_24_24_purple.svg`}
                        width={24}
                        height={24}
                        alt="답변"
                      />
                    </div>
                    <p className="subject" dangerouslySetInnerHTML={{ __html: comment.contents }} />
                  </div>
                );
              })
            : null}
          {isMyPost && !isCommented ? (
            <div className="actions-wrap">
              <button className="btn-text" onClick={onClickEdit}>
                수정
              </button>
              <button className="btn-text" onClick={onClickDelete}>
                삭제
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default forwardRef(ListItem);
