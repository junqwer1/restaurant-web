import React from 'react'
import styled from 'styled-components'
import type { CommonType } from '@/app/global/types/StyledType'

const StyledForm = styled.form<CommonType>``

const SearchForm = ({ form, onChange, onSubmit }) => {
  return <StyledForm onSubmit={onSubmit}></StyledForm>
}

export default React.memo(SearchForm)
