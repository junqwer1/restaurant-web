import React from 'react'
import styled from 'styled-components'
import type { CommonType } from '@/app/global/types/StyledType'
import { FaMapMarkerAlt } from 'react-icons/fa'
import colors from '@/app/global/styles/colors'
import sizes from '@/app/global/styles/sizes'
const { info, dark, white, danger } = colors
const { big, medium } = sizes

const StyledUl = styled.ul<CommonType>`
  li {
    box-shadow: 2px 2px 5px ${dark};
    padding: 50px;
    border-radius: 15px;
    font-size: ${medium};
    position: relative;

    .top {
      font-size: ${big};
      margin-bottom: 20px;

      .badge {
        display: inline-block;
        padding: 8px 15px;
        border-radius: 3px;
        background: ${info};
        color: ${white};
        margin-right: 15px;
      }
    }
  }

  li + li {
    margin-top: 25px;
  }

  svg {
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 2.75rem;
    cursor: pointer;
    color: ${danger};
  }
`

const ListItem = ({ item, onClick }) => {
  const { category, address, name, latitude, longitude } = item
  return (
    <li>
      <div className="top">
        <span className="badge">{category}</span>
        <span className="name">{name}</span>
      </div>
      <div className="address">{address}</div>
      <FaMapMarkerAlt onClick={() => onClick(latitude, longitude)} />
    </li>
  )
}

const RestaurantItems = ({ items, onClick }) => {
  return (
    items && (
      <StyledUl>
        {items.map((item) => (
          <ListItem
            key={'restaurant_' + item.seq}
            item={item}
            onClick={onClick}
          />
        ))}
      </StyledUl>
    )
  )
}

export default React.memo(RestaurantItems)