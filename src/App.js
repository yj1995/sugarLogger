import React, { useEffect, useState } from 'react';
import styles from './styles/index.scss'
import { Data } from './constant/data'

export function App() {
  const [displayData, setDisplayData] = useState([])
  const [orderingData, setOrderingData] = useState([])
  let [orderValue, setOrderValue] = useState('Asc')
  let [search, setSearchValue] = useState('')

  useEffect(() => {
    const sortedData = Data.sort((a, b) => a.id - b.id);
    setDisplayData(sortedData)
    setOrderingData(sortedData)
  }, [])

  const renderValue = ({ id, name }) => (
    <div key={id + name}>
      <span className={`${styles.id} ${styles.widthId}`}>{id}</span>
      <span className={`${styles.name} ${styles.widthName}`}>{name}</span>
    </div>
  )

  const renderHeader = () => (
    <div>
      <span className={`${styles.id} ${styles.widthId}`}>ID</span>
      <span className={`${styles.name} ${styles.widthName}`}>Name</span>
    </div>
  )

  const changeRadioValue = (e) => {
    const { value } = e.target
    setOrderValue(value)
    setDisplayData([...displayData].reverse())
    setOrderingData([...displayData].reverse())
  }

  const searchValue = (e) => {
    const { value } = e.target
    setSearchValue(value)
    const filterData = orderingData.filter((data) => (data.name.toLowerCase().match(value.toLowerCase())))
    setDisplayData(filterData)
  }

  const renderFilter = () => (
    <div className={styles.filterParent}>
      <label className={styles.radioSpace}><input type="radio" value="Asc" name="order" checked={orderValue === "Asc"} onChange={changeRadioValue} /> Asc</label>
      <label className={styles.radioSpace}><input type="radio" value="Des" name="order" checked={orderValue === "Des"} onChange={changeRadioValue} /> Des</label>
      <input className={styles.searchFields} value={search} placeholder='Search Name' onChange={searchValue} />
    </div>
  )

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.allParent}>
        <div className={styles.header}>Application Data</div>
        <div className={styles.filter}>
          {renderFilter()}
        </div>
        <div className={styles.tableData}>
          {displayData.length ? (
            <>
              {renderHeader()}
              {displayData.map((val) => (renderValue(val)))}
            </>) : 'No Data Available'}
        </div>
      </div>
    </div>
  )
}
