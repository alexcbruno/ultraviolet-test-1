import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../../theme'
import { Box } from '../Box'
import { Tag } from '../Tag'

const container = {
  base: css`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${colors.gray350};
    &:focus-within {
      border: 1px solid ${colors.primary};
      box-shadow: 0 0 1px 2px ${transparentize(0.75, colors.primary)};
    }

    & > * {
      margin: 6px;
    }
  `,
  bordered: css`
    margin-top: 0;
    padding: 8px 0;

    > input:focus {
      box-shadow: 0 0 1px 2px ${transparentize(0.6, colors.primary)};
    }

    > * {
      margin-bottom: 6px;
      &:not(:last-child) {
        margin-right: 6px;
      }
    }
  `,
  noBorder: css`
    &:focus-within {
      box-shadow: 0 0 2px 4px ${transparentize(0.75, colors.primary)};
    }

    > * {
      margin-right: 6px;
      margin-bottom: 6px;
    }
  `,
}

const styles = {
  input: css`
    font-size: 16px;
    color: ${colors.gray700};
    border: none;
    outline: none;
    background-color: ${colors.white};
    &::placeholder {
      color: ${colors.gray550};
    }
  `,
}

export const Tags = ({
  // If this component is used with a RichSelect, tags will be a
  // list of objects.
  areTagsObject,
  borderedContainer,
  controlled,
  disabled,
  manualInput,
  name,
  onChange,
  onChangeError,
  placeholder,
  tags,
  variant,
  ...props
}) => {
  const [tagsState, setTags] = useState(tags)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState({})

  useEffect(() => {
    // In a RichSelect, the new value is not a text input
    // Tags management is done higher, and the source of truth
    // is the tags prop.
    if (controlled) {
      if (tags.length !== tagsState.length) {
        setTags(tags)
      }
    }
  }, [controlled, tags, tagsState.length])

  const inputRef = useRef(null)

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const onInputChange = e => {
    setInput(e.target.value)
  }

  const addTag = async () => {
    const newTags = input ? [...tagsState, input] : tagsState
    setInput('')
    setTags(newTags)
    if (newTags.length !== tagsState.length) {
      setStatus({ [newTags.length - 1]: 'loading' })
    }
    try {
      await onChange(newTags)
      setStatus({ [newTags.length - 1]: 'idle' })
    } catch (e) {
      onChangeError(e)
      setTags(tagsState)
    }
  }

  const deleteTag = async index => {
    setStatus({ [index]: 'loading' })
    const newTags = [
      ...tags.slice(0, index),
      ...tags.slice(index + 1, tags.length),
    ]
    try {
      await onChange(newTags)
      setTags(newTags)
      setStatus({ [index]: 'idle' })
    } catch (e) {
      onChangeError(e)
      setTags(tags)
    }
  }

  const handleInputKeydown = e => {
    // 32 = Space | 13 = Enter | 8 = backspace
    if (e.keyCode === 32 || e.keyCode === 13) {
      addTag()
      e.preventDefault()
    }
    if (
      e.keyCode === 8 &&
      inputRef.current.selectionStart === 0 &&
      tags.length
    ) {
      e.preventDefault()
      deleteTag(tags.length - 1)
    }
  }

  return (
    !(variant === 'bordered' && !tagsState.length) && (
      <Box
        css={borderedContainer ? container[variant] : container.noBorder}
        onClick={handleContainerClick}
        display="flex"
        flexWrap="wrap"
        onBlur={addTag}
        {...props}
      >
        {tagsState.map((tab, index) => (
          <Tag
            variant={variant}
            disabled={disabled}
            key={`tag-${index}`}
            isLoading={status[index] === 'loading'}
            onClose={() => deleteTag(index)}
          >
            {areTagsObject ? tab.label : tab}
          </Tag>
        ))}
        {!disabled && manualInput ? (
          <input
            name={name}
            type="text"
            placeholder={!tagsState.length ? placeholder : ''}
            value={input}
            css={styles.input}
            onChange={onInputChange}
            onKeyDown={handleInputKeydown}
            ref={inputRef}
          />
        ) : null}
      </Box>
    )
  )
}

Tags.defaultProps = {
  areTagsObject: false,
  borderedContainer: true,
  controlled: false,
  disabled: false,
  manualInput: true,
  onChangeError: () => {},
  placeholder: undefined,
  tags: [],
  variant: 'base',
}

Tags.propTypes = {
  areTagsObject: PropTypes.bool,
  borderedContainer: PropTypes.bool,
  controlled: PropTypes.bool,
  disabled: PropTypes.bool,
  manualInput: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeError: PropTypes.func,
  placeholder: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
      }),
    ]),
  ),
  variant: PropTypes.string,
}
