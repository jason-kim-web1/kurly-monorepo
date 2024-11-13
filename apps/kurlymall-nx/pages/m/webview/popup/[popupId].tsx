import axios from 'axios';
import styled from '@emotion/styled';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { MainPopupNotice } from '../../../../src/main/interfaces/PopupNotice.interface';
import { BaseResponse } from '../../../../src/shared/interfaces';
import RawHTML from '../../../../src/shared/components/layouts/RawHTML';
import { INTERNAL_API_URL } from '../../../../src/shared/configs/config';
import { getServerSideSessionData } from '../../../../src/shared/services/session.service';

const Container = styled.div`
  min-height: 100px;
  > p.empty {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function PopupContentPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container>
      {data ? <RawHTML html={data} /> : <p className="empty">팝업이 종료되었습니다. 감사합니다.</p>}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req, res, query } = context;
    const { accessToken } = await getServerSideSessionData(req, res);
    const popupId = query.popupId as string;
    const url = `${INTERNAL_API_URL}/banner/v1/popups/${popupId}`;
    const { data } = await axios.get<BaseResponse<MainPopupNotice>>(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return {
      props: {
        data: data.data.mobile.content ?? '',
      },
    };
  } catch (err) {
    return {
      props: {
        data: '',
      },
    };
  }
};
