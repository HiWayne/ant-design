import React, { FC, PropsWithChildren } from 'react';
import Footer from 'dumi/theme/slots/Footer';
import AffixTabs from './AffixTabs';
import { useRouteMeta } from 'dumi';
import { css } from '@emotion/react';
import EditButton from '../../common/EditButton';
import { FormattedMessage } from 'react-intl';
import { Layout, Typography } from 'antd';
import useSiteToken from '../../../hooks/useSiteToken';

export type ResourceLayoutProps = PropsWithChildren<{}>;

const useStyle = () => {
  const { token } = useSiteToken();
  const { antCls } = token;

  const resourcePadding = 40;
  const articleMaxWidth = 1208;
  const resourcePaddingXS = 24;

  return {
    resourcePage: css`
      footer {
        margin-top: 176px;

        .rc-footer-container {
          max-width: ${articleMaxWidth}px;
          margin: 0 auto;
          padding-right: 0;
          padding-left: 0;
        }
      }
    `,
    resourceContent: css`
      padding: 0 ${resourcePadding}px;
      max-width: ${articleMaxWidth}px;
      margin: 0 auto;
      box-sizing: content-box;

      > .markdown {
        > p {
          margin-bottom: 56px;
        }

        h2 {
          margin-top: 124px;
          color: #314659;
          font-weight: lighter;
          font-size: 30px;
          line-height: 38px;

          &:first-child {
            margin-top: 88px;
          }
        }

        h3 {
          margin-top: 56px;
          font-weight: 400;
          font-size: 24px;
          line-height: 32px;
        }

        p {
          color: #697b8c;
        }
      }

      @media only screen and (max-width: 767.99px) {
        & {
          article {
            padding: 0 ${resourcePaddingXS}px;
          }

          ${antCls}-col {
            padding-top: 16px !important;
            padding-bottom: 16px !important;
          }
        }
      }
    `,
    banner: css`
      padding: 0 ${resourcePadding}px;
      overflow: hidden;
      background: url('https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*y_r7RogIG1wAAAAAAAAAAABkARQnAQ');
      background-size: cover;

      h1 {
        box-sizing: content-box;
        max-width: ${articleMaxWidth}px;
        margin: 56px auto 16px;
      }

      section {
        max-width: ${articleMaxWidth}px;
        margin: 0 auto 56px;
        font-weight: 200;
        font-size: 16px;
        line-height: 24px;
      }

      @media only screen and (max-width: 767.99px) {
        & {
          margin: 0 -${resourcePaddingXS}px;
          padding: 0 ${resourcePaddingXS}px;
        }
      }
    `,
  };
};

const ResourceLayout: FC<ResourceLayoutProps> = ({ children }) => {
  const styles = useStyle();
  const meta = useRouteMeta();

  return (
    <Layout>
      <div id="resources-page" css={styles.resourcePage}>
        <AffixTabs />
        <div css={styles.banner}>
          <Typography.Title>
            {meta.frontmatter.title}
            <EditButton
              title={<FormattedMessage id="app.content.edit-page" />}
              filename={meta.frontmatter.filename}
            />
          </Typography.Title>
          <section>{meta.frontmatter.description}</section>
        </div>
        <div css={styles.resourceContent}>{children}</div>
        <Footer />
      </div>
    </Layout>
  );
};

export default ResourceLayout;
