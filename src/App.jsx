import React, {useState, useMemo, useEffect} from "react";
import { generateMockData } from "./mockData";
import DashboardMetrics from './DashboardMetrics';
import FilterPanel from "./FilterPanel";
import AnalyticTable from './AnalyticTable';
import TaskModal from "./TaskModal";

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


  // слушатель горячих клавиш
  useEffect(()=>{
    const handleKeyDown = (e) => {
      if(e.altKey && (e.key ==='n' || e.key ==='т' || e.key ==='N' || e.key ==='Т')){
        e.preventDefault();
        setModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return ()=> window.removeEventListener('keydown', handleKeyDown);
  }, []);


  const handleAddNewItem = (newItem) => {
    setRawData(prev=>[newItem, ...prev]);
  };

  return (
    <>
    <h1>Dashboard Builder</h1>
    {/* компонент метрик */}
    <DashboardMetrics filteredData={filteredData} />
    {/* панель фильтров */}
    <FilterPanel 
      filters={filters}
      setFilters={setFilters}
      onOpenModal={()=>setModalOpen(true)}
    />

    {/* таблица данных */}
    <AnalyticTable data={filteredData} />

    {/* модальное окно */}
    <TaskModal 
      isOpen={isModalOpen}
      onClose={()=>setModalOpen(false)}
      onAdd={handleAddNewItem}
    />
    </>
    
  )
}

export default App;
