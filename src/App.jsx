import React, {useState, useMemo, useEffect} from "react";
import { generateMockData } from "./mockData";
import DashboardMetrics from './DashboardMetrics';
import FilterPanel from "./FilterPanel";
import AnalyticTable from './AnalyticTable';

function App() {
  const [rawData, setRawData] = useState(()=>generateMockData());
  const [filters, setFilters] = useState({search: '', category:'', status:''});
  const [isModalOpen, setModalOpen] = useState(false);

  // фильтрация массива
  const filteredData =  useMemo(()=>{
      return rawData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category ? item.category === filters.category : true;
        const matchesStatus = filters.status ? item.status === filters.status : true;
        return matchesSearch && matchesCategory && matchesStatus;
      }
        
      )
  },[rawData, filters.search, filters.category, filters.status]);

  const handleNewItem = () => {};

  return (
    <>
    <h1>Dashboard Builder</h1>
    {/* компонент метрик */}
    <DashboardMetrics filteredData={filteredData} />
    {/* панель фильтров */}
    <FilterPanel 
      filters={filters}
      setFilters={setFilters}
      onOpenModal={handleNewItem}
    />

    {/* таблица данных */}
    <AnalyticTable data={filteredData} />
    </>
  )
}

export default App;
