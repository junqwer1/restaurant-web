import React from 'react'
import styled from 'styled-components'
import type { CommonType } from '@/app/global/types/StyledType'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { BigButton } from '@/app/global/components/Buttons'
import { Input } from '@/app/global/components/FormComponents'

const StyledForm = styled.form<CommonType>``

const SearchForm = ({ form, onChange, onClick, onSubmit }) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <dl>
        <dt>검색기준</dt>
        <dd>
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
            color='secondary'
          />
        </dd>
      </dl>
      <BigButton type="submit" color="primary">
        검색하기
      </BigButton>
    </StyledForm>
  )
}

export default React.memo(SearchForm)
