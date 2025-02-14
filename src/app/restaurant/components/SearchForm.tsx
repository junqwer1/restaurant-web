'use client'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import type { CommonType } from '@/app/global/types/StyledType'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import classNames from 'classnames'
import { BigButton } from '@/app/global/components/Buttons'
import { Input } from '@/app/global/components/FormComponents'
import areas from '../../global/datas/areas'
import colors from '@/app/global/styles/colors'
import sizes from '@/app/global/styles/sizes'

const { sido, sigungu } = areas

const { primary, white, secondary, dark } = colors
const { medium } = sizes

const StyledForm = styled.form<CommonType>`
  dl {
    display: flex;
    align-items: center;
    font-size: ${medium};

    dt {
      width: 150px !important;
      padding: 10px;
    }

    dd {
      flex-grow: 1;
      padding: 10px;
      word-wrap: wrap;
    }
  }

  .area-tab {
    border: 1px solid ${primary};
    color: ${primary};
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${medium};
    display: inline-block;
    margin: 0 5px 5px 0;

    &.on {
      background: ${primary};
      color: ${white};
    }

    &.secondary {
      border-color: ${secondary};
      color: ${dark};
    }

    &.secondary.on {
      background: ${secondary};
      color: ${white};
    }
  }

  button[type='submit'] {
    margin: 20px 0 50px;
  }

  svg {
    font-size: 2rem;
    position: relative;
    top: 6px;
  }

  .radio-group span + span {
    margin-left: 15px;
  }
`

const SearchForm = ({ form, onChange, onClick, onSubmit }) => {
  const [_sigungu, setSigungu] = useState<any>([])

  const onSidoClick = useCallback(
    (sido) => {
      setSigungu(sigungu[sido] ?? [])
      onClick('sido', sido)
    },
    [onClick],
  )

  return (
    <StyledForm onSubmit={onSubmit}>
      <dl>
        <dt>검색기준</dt>
        <dd className="radio-group">
          <span onClick={() => onClick('mode', 'current')}>
            {form?.mode === 'current' ? (
              <MdRadioButtonChecked />
            ) : (
              <MdRadioButtonUnchecked />
            )}
            현재 위치
          </span>
          <span onClick={() => onClick('mode', 'address')}>
            {form?.mode === 'current' ? (
              <MdRadioButtonUnchecked />
            ) : (
              <MdRadioButtonChecked />
            )}
            지역 검색
          </span>
        </dd>
      </dl>
      <dl>
        <dt>식당이름</dt>
        <dd>
          <Input
            type="text"
            name="name"
            value={form?.name ?? ''}
            onChange={onChange}
            color="secondary"
          />
        </dd>
      </dl>
      {form?.mode !== 'current' && (
        <>
          <dl>
            <dt>지역선택</dt>
            <dd>
              {sido.map((_sido) => (
                <span
                  key={'sido_' + _sido}
                  onClick={() => onSidoClick(_sido)}
                  className={classNames('area-tab', {
                    on: form?.sido === _sido,
                  })}
                >
                  {_sido}
                </span>
              ))}
            </dd>
          </dl>
          {_sigungu && _sigungu.length > 0 && (
            <dl>
              <dt></dt>
              <dd>
                {_sigungu.map((s) => (
                  <span
                    key={'sigungu_' + s}
                    className={classNames('area-tab secondary', {
                      on: form?.sigungu === s,
                    })}
                    onClick={() => onClick('sigungu', s)}
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </dl>
          )}
        </>
      )}
      <BigButton type="submit" color="primary">
        검색하기
      </BigButton>
    </StyledForm>
  )
}

export default React.memo(SearchForm)   