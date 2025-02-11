'use client'
import React from 'react'
import Link from 'next/link'
import { styled } from 'styled-components'
import { FaUserPlus, FaHome } from 'react-icons/fa'
import { MdContactPage } from 'react-icons/md'
import { SlLogin, SlLogout } from 'react-icons/sl'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'
import useUser from '../../hooks/useUser'
import type { CommonType } from '../../types/StyledType'

const { light } = colors
const { big } = sizes

const StyledHeader = styled.header<CommonType>`
  .site-top {
    background: ${light};
    height: 45px;

    .layout-width {
      display: flex;
      justify-content: space-between;

      & > div {
        display: flex;
        align-items: center;
        height: 45px;

        a + a {
          margin-left: 10px;
        }

        a {
          line-height: 1;
        }
      }

      svg {
        font-size: ${big};
      }
    }
  }
`

const Header = () => {
  const { userInfo, isLogin } = useUser()
  const email = userInfo?.email
  const name = userInfo?.name

  return (
    <StyledHeader>
      <div className="site-top">
        <div className="layout-width">
          <div className="left">
            <Link href="/">
              <FaHome />
            </Link>
          </div>
          <div className="right">
            {isLogin ? (
              <>
                {name}({email})님,
                <a href="/mypage">
                  <MdContactPage /> 마이페이지
                </a>
                <a href="/member/api/logout">
                  <SlLogout />
                  로그아웃
                </a>
              </>
            ) : (
              <>
                <a href="/member/join">
                  <FaUserPlus /> 회원가입
                </a>
                <a href="/member/login">
                  <SlLogin /> 로그인
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      {/* site-top */}
    </StyledHeader>
  )
}

export default React.memo(Header)
