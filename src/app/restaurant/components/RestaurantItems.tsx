import React from "react";
import styled from "styled-components";
import type { CommonType } from "@/app/global/types/StyledType";

const StyledUl = styled.ul<CommonType>``

const RestaurantItems = () => {
  return <StyledUl></StyledUl>
}

export default React.memo(RestaurantItems)