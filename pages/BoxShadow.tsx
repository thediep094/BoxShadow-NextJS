import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { resetServerContext } from 'react-beautiful-dnd'
import { GetServerSideProps } from 'next'
interface properties {
  id: string
  shiftRight: number
  shiftDown: number
  spread: number
  blur: number
  opacity: number
  inset: null | boolean
  backgroundColor: string
  color: string
  boxShadowColor: string
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext()
  return { props: { data: [] } }
}
const BoxShadow = () => {
  const [boxShadow, setBoxShadow] = useState<string>('')
  const [choose, setChoose] = useState<number>(0)
  const [properties, setProperties] = useState<properties>({
    id: '0',
    shiftRight: 0,
    shiftDown: 0,
    spread: 0,
    blur: 0,
    opacity: 0,
    inset: null,
    backgroundColor: 'rgba(255,0,0,0)',
    color: 'rgba(0, 217, 255,1)',
    boxShadowColor: 'rgba(255,0,0,0.34)',
  })
  const [array, setArray] = useState<properties[]>([properties])

  const changeValue = (e: any): void => {
    //check with input range
    if (
      e.target.name !== 'inset' &&
      e.target.name !== 'backgroundColor' &&
      e.target.name !== 'color' &&
      e.target.name !== 'boxShadowColor' &&
      e.target.name !== 'opacity'
    ) {
      setProperties({
        ...properties,
        [e.target.name]: e.target.value,
      })
    } //check with checkbox inset
    else if (e.target.name === 'inset') {
      setProperties({
        ...properties,
        [e.target.name]: e.target.checked,
      })
    }
    //check change color
    else if (e.target.name === 'backgroundColor') {
      const r = parseInt(e.target.value.substr(1, 2), 16)
      const g = parseInt(e.target.value.substr(3, 2), 16)
      const b = parseInt(e.target.value.substr(5, 2), 16)
      setProperties({
        ...properties,
        [e.target.name]: `rgb(${r},${g},${b})`,
      })
    } else if (e.target.name === 'color') {
      const r = parseInt(e.target.value.substr(1, 2), 16)
      const g = parseInt(e.target.value.substr(3, 2), 16)
      const b = parseInt(e.target.value.substr(5, 2), 16)
      setProperties({
        ...properties,
        [e.target.name]: `rgb(${r},${g},${b})`,
      })
    } else if (e.target.name === 'opacity') {
      const boxShadowColor = properties.boxShadowColor.split(',')
      boxShadowColor[3] = (e.target.value / 100).toString()
      setProperties({
        ...properties,
        boxShadowColor: boxShadowColor.join(',') + ')',
        [e.target.name]: e.target.value,
      })
    } else if (e.target.name === 'boxShadowColor') {
      const r = parseInt(e.target.value.substr(1, 2), 16)
      const g = parseInt(e.target.value.substr(3, 2), 16)
      const b = parseInt(e.target.value.substr(5, 2), 16)
      setProperties({
        ...properties,
        [e.target.name]: `rgba(${r},${g},${b},${properties.opacity / 100})`,
      })
    }

    //bugs when remove and change properties auto add layer
    //fix by use if

    if (array.length > choose) {
      array[choose] = {
        ...array[choose],
        ...properties,
      }
    }
    run()
  }
  const run = (): void => {
    //run funtion to change boxShadow value
    let boxShadow = ''
    array.forEach((item, index) => {
      boxShadow += `${item.boxShadowColor} ${item.shiftRight}px ${item.shiftDown}px ${
        item.spread
      }px ${item.blur}px ${item.inset ? 'inset' : ''}`
      if (index !== array.length - 1) {
        boxShadow += ', '
      }
    })

    // boxShadow += `${properties.boxShadowColor} ${properties.shiftRight}px ${
    //   properties.shiftDown
    // }px ${properties.spread}px ${properties.blur}px ${properties.inset ? 'inset' : ''}`
    setBoxShadow(boxShadow)
  }

  //remove layer

  const removeLayer = (id: string): void => {
    if (array.length > 1) {
      const newArray = array.filter((item, index) => item.id !== id)
      setArray(newArray)
    }
  }

  //addlayer to array
  const addLayer = (): void => {
    setArray([
      ...array,
      {
        ...properties,
        id: Math.random().toString(36).substr(2, 9),
      },
    ])
  }
  useEffect(() => {
    run()
  }, [array])

  const handleOnDragEnd = (result: any): void => {
    if (!result.destination) return
    const items = Array.from(array)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setArray(items)
    setChoose(result.destination.index)
  }
  return (
    <div>
      <Header />
      <div className="BoxShadow__container">
        <div className="App">
          <div className="custom">
            <h1>Box-Shadow CSS Generator</h1>
            <div className="custom__item">
              <p>Shift right</p>
              <input
                type="range"
                min={-50}
                max={50}
                name="shiftRight"
                className="range"
                value={properties.shiftRight}
                onChange={changeValue}
              />
            </div>
            <div className="custom__item">
              <p>Shift down</p>
              <input
                type="range"
                min={-50}
                max={50}
                name="shiftDown"
                className="range"
                value={properties.shiftDown}
                onChange={changeValue}
              />
            </div>
            <div className="custom__item">
              <p>Spread</p>
              <input
                type="range"
                min={0}
                max={100}
                name="spread"
                className="range"
                value={properties.spread}
                onChange={changeValue}
              />
            </div>
            <div className="custom__item">
              <p>Blur</p>
              <input
                type="range"
                min={0}
                max={100}
                name="blur"
                className="range"
                value={properties.blur}
                onChange={changeValue}
              />
            </div>
            <div className="custom__item">
              <p>Opacity</p>
              <input
                type="range"
                min={0}
                max={100}
                name="opacity"
                className="range"
                value={properties.opacity}
                onChange={changeValue}
              />
            </div>
            <div className="custom__checkbox">
              <input type="checkbox" name="inset" className="color" onChange={changeValue} />
              <p>Inset</p>
            </div>
            <input type="color" name="boxShadowColor" value="#ff0000" onChange={changeValue} />
            <button className="button" onClick={addLayer}>
              Add Layer
            </button>
            {/* <ul
              className="layers"
              style={{
                listStyle: 'none',
              }}
            >
              {array.map((item, index) => (
                <li
                  key={index}
                  style={{
                    listStyle: 'none',
                  }}
                >
                  <div className="layer" key={index}>
                    <div
                      className={choose === index ? 'layer__item active' : 'layer__item'}
                      onClick={() => {
                        setChoose(index)
                        setProperties(item)
                      }}
                    >
                      <p className="layer__item__p">
                        {item.shiftRight} {item.shiftDown} {item.spread} {item.blur}{' '}
                        {item.boxShadowColor}
                      </p>
                      <div className="remove">
                        <button
                          className="button__remove"
                          onClick={() => {
                            removeLayer(item.id)
                          }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                
              ))}
            </ul> */}

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul
                    className="layers"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      listStyle: 'none',
                    }}
                  >
                    {array.map(({ id, ...item }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="layer" key={index}>
                                <div
                                  className={
                                    choose === index ? 'layer__item active' : 'layer__item'
                                  }
                                  onClick={() => {
                                    setChoose(index)
                                    setProperties({
                                      ...item,
                                      id: id,
                                    })
                                  }}
                                >
                                  <p className="layer__item__p">
                                    {item.shiftRight} {item.shiftDown} {item.spread} {item.blur}{' '}
                                    {item.boxShadowColor}
                                  </p>
                                  <div className="remove">
                                    <button
                                      className="button__remove"
                                      onClick={() => {
                                        removeLayer(id)
                                      }}
                                    >
                                      X
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="review">
            <div className="review-box">
              <div className="review-box__top">
                <div className="review-box__top-left">
                  <h1>Preview</h1>
                </div>
                <div className="review-box__top-right">
                  <div className="review-box__top-right__color">
                    <input
                      type="color"
                      name="backgroundColor"
                      defaultValue="#ffffff"
                      className="color"
                      onChange={changeValue}
                    />
                    <input
                      type="color"
                      name="color"
                      defaultValue="#00d9ff"
                      className="color"
                      onChange={changeValue}
                    />
                  </div>
                </div>
              </div>

              <div
                className="review-box__bottom"
                style={{
                  backgroundColor: properties.backgroundColor,
                }}
              >
                {/* absolute */}

                <div
                  className="review-box__bottom__box"
                  style={{
                    backgroundColor: properties.color,
                    boxShadow: `${boxShadow}`,
                  }}
                ></div>
              </div>
            </div>
            <div className="review-box-csscode">
              <h1>CSS Code</h1>
              <p>
                {/* {`box-shadow: ${properties.boxShadowColor} ${properties.shiftRight}px ${properties.shiftDown}px ${properties.spread}px ${properties.blur}px ${properties.inset ? 'inset' : ''};`} */}
                {`box-shadow: ${boxShadow};`}
              </p>
              {/* {boxShadow} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxShadow
