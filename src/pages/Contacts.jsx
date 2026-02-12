import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import {
  selectFilteredContacts,
  addContact,
  editContact,
  setSearchTerm,
  setFilterField,
  setStartDate,
  setEndDate,
  setDateFilterMode
} from '../features/contactSlice';
import Sidebar from '../components/Sidebar';
import GlobalFilter from '../components/GlobalFilter';
import Pagination from '../components/Pagination';

const keyMap = {
  'Contact Owner': 'contactOwner',
  'Account Name': 'accountName',
  'Name': 'name',
  'Email': 'email',
  'Phone': 'phone',
  'Created Date': 'createdDate',
  'Contact Source': 'contactSource',
  'Contact Status': 'contactStatus',
  'Contact Bia': 'contactBia'
};

const headers = Object.keys(keyMap);

const Contacts = () => {
  const data = useSelector(selectFilteredContacts);
  const { dateFilterMode: reduxDateFilterMode, startDate: reduxStartDate, endDate: reduxEndDate, searchTerm } = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filterField, setFilterFieldLocal] = useState('all');
  const pageSize = 10;

  // Reset form when editingId changes
  useEffect(() => {
    if (!editingId) {
      reset({
        contactOwner: '',
        accountName: '',
        name: '',
        email: '',
        phone: '',
        contactSource: '',
        contactStatus: '',
        contactBia: ''
      });
    }
  }, [editingId, reset]);

  const handleSort = useCallback((header) => {
    const key = keyMap[header];
    setSortConfig(prev => {
      if (prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return { key: null, direction: null };
    });
  }, []);

  const sortData = useCallback((rows) => {
    if (!sortConfig.key || !sortConfig.direction) return rows;
    return [...rows].sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';
      return sortConfig.direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }, [sortConfig]);

  const totalSortedData = useMemo(() => {
    return sortData(data);
  }, [data, sortData]);

  const currentData = useMemo(() => {
    const start = page * pageSize;
    return totalSortedData.slice(start, start + pageSize);
  }, [totalSortedData, page, pageSize]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(totalSortedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
    XLSX.writeFile(wb, 'contacts.xlsx');
  };

  const onSubmit = (formData) => {
    if (editingId) {
      dispatch(editContact({ ...formData, id: editingId }));
      setEditingId(null);
    } else {
      dispatch(addContact({
        ...formData,
        id: Date.now(),
        createdDate: new Date().toLocaleDateString('en-GB'),
      }));
    }
    reset();
  };

  const startEdit = (contact) => {
    const formValues = {
      contactOwner: contact.contactOwner || '',
      accountName: contact.accountName || '',
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      contactSource: contact.contactSource || '',
      contactStatus: contact.contactStatus || '',
      contactBia: contact.contactBia || ''
    };
    reset(formValues);
    setEditingId(contact.id);
  };

  const getSortSymbol = (header) => {
    const key = keyMap[header];
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  // Pagination handlers
  const nextPage = () => setPage(p => p + 1);
  const previousPage = () => setPage(p => Math.max(p - 1, 0));
  const canNextPage = (page + 1) * pageSize < totalSortedData.length;
  const canPreviousPage = page > 0;

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <h1>Contact List</h1>

        <TopBar>
          <FilterSection>
            {filterField === 'createdDate' ? (
              <>
                <ModeSelect value={reduxDateFilterMode} onChange={(e) => dispatch(setDateFilterMode(e.target.value))}>
                  <option value="date">Date Range</option>
                  <option value="month">Month Range</option>
                  <option value="year">Year</option>
                </ModeSelect>
                <DateRangeContainer>
                  {reduxDateFilterMode === 'date' && (
                    <>
                      <DateLabel>From:</DateLabel>
                      <DateInput
                        type="date"
                        value={reduxStartDate || ''}
                        onChange={(e) => dispatch(setStartDate(e.target.value))}
                        placeholder="Start Date"
                      />
                      <DateLabel>To:</DateLabel>
                      <DateInput
                        type="date"
                        value={reduxEndDate || ''}
                        onChange={(e) => dispatch(setEndDate(e.target.value))}
                        placeholder="End Date"
                      />
                    </>
                  )}

                  {reduxDateFilterMode === 'month' && (
                    <>
                      <DateLabel>From:</DateLabel>
                      <MonthSelect
                        value={reduxStartDate || ''}
                        onChange={(e) => dispatch(setStartDate(e.target.value))}
                        aria-label="From month"
                      >
                        <option value="">--</option>
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                      </MonthSelect>
                      <DateLabel>To:</DateLabel>
                      <MonthSelect
                        value={reduxEndDate || ''}
                        onChange={(e) => dispatch(setEndDate(e.target.value))}
                        aria-label="To month"
                      >
                        <option value="">--</option>
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                      </MonthSelect>
                    </>
                  )}

                  {reduxDateFilterMode === 'year' && (
                    <>
                      <DateLabel>Year:</DateLabel>
                      <DateInput
                        type="number"
                        min="1900"
                        max="2100"
                        value={reduxStartDate || ''}
                        onChange={(e) => {
                          dispatch(setStartDate(e.target.value));
                          dispatch(setEndDate(''));
                        }}
                      />
                    </>
                  )}
                </DateRangeContainer>
              </>
            ) : (
              <GlobalFilter 
                filter={searchTerm} 
                setFilter={(value) => dispatch(setSearchTerm(value))} 
              />
            )}
            <select
              value={filterField}
              onChange={(e) => {
                setFilterFieldLocal(e.target.value);
                dispatch(setFilterField(e.target.value));
              }}
            >
              <option value="all">All Columns</option>
              {headers.map(h => (
                <option key={h} value={keyMap[h]}>
                  {h}
                </option>
              ))}
            </select>
          </FilterSection>
          <button onClick={exportToExcel}>Export Excel</button>
        </TopBar>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Edit</th>
                {headers.map(h => (
                  <th key={h} onClick={() => handleSort(h)} style={{ cursor: 'pointer' }}>
                    {h}{getSortSymbol(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map(row => (
                <tr key={row.id}>
                  <td><button onClick={() => startEdit(row)}>Edit</button></td>
                  {headers.map(h => (
                    <td key={h}>{row[keyMap[h]]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>

        <Pagination
          pageIndex={page}
          nextPage={nextPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          pageSize={pageSize}
          total={totalSortedData.length}
          onPageJump={setPage}
        />

        <FormSection>
          <h3>{editingId ? 'Edit Contact' : 'Add Contact'}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGrid>
              <div>
                <label>Contact Owner</label>
                <input 
                  {...register('contactOwner', { required: 'Contact Owner is required' })}
                  defaultValue=""
                />
                {errors.contactOwner && <Error>{errors.contactOwner.message}</Error>}
              </div>
              <div>
                <label>Account Name</label>
                <input 
                  {...register('accountName', { required: 'Account Name is required' })}
                  defaultValue=""
                />
                {errors.accountName && <Error>{errors.accountName.message}</Error>}
              </div>
              <div>
                <label>Name</label>
                <input 
                  {...register('name', { required: 'Name is required' })}
                  defaultValue=""
                />
                {errors.name && <Error>{errors.name.message}</Error>}
              </div>
              <div>
                <label>Email</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  defaultValue=""
                />
                {errors.email && <Error>{errors.email.message}</Error>}
              </div>
              <div>
                <label>Phone</label>
                <input
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone must be 10 digits'
                    }
                  })}
                  defaultValue=""
                />
                {errors.phone && <Error>{errors.phone.message}</Error>}
              </div>
              <div>
                <label>Contact Source</label>
                <input {...register('contactSource')} defaultValue="" />
              </div>
              <div>
                <label>Contact Status</label>
                <input {...register('contactStatus')} defaultValue="" />
              </div>
              <div>
                <label>Contact Bia</label>
                <input {...register('contactBia')} defaultValue="" />
              </div>
            </FormGrid>
            <FormButtonGroup>
              <SubmitButton type="submit">{editingId ? 'Update' : 'Add Contact'}</SubmitButton>
              {editingId && (
                <CancelButton 
                  type="button" 
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </CancelButton>
              )}
            </FormButtonGroup>
          </form>
        </FormSection>
      </MainContent>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  margin-left: 250px;
  max-width: calc(100vw - 250px);
  overflow-x: hidden;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
    max-width: 100vw;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
    min-width: 200px;
    
    @media (max-width: 480px) {
      min-width: 100%;
    }
  }

  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 150px;
    
    @media (max-width: 480px) {
      min-width: 100%;
    }
  }

  button {
    padding: 8px 16px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: center;
    min-width: 140px;
    height: 48px;
    white-space: nowrap;
    
    @media (max-width: 480px) {
      width: 100%;
      height: auto;
    }
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 250px;
  align-items: center;
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;
  min-width: 300px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    min-width: 200px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const DateLabel = styled.label`
  font-weight: 600;
  color: #333;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const DateInput = styled.input`
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 0 -15px;
  max-width: 100%;
  
  table {
    width: 100%;
    min-width: 900px;
    border-collapse: collapse;
    th, td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      white-space: nowrap;
      vertical-align: middle;
      
      &:first-child {
        width: 80px;
        text-align: left;
      }
    }
    th {
      background-color: #f0f0f0;
      position: sticky;
      top: 0;
    }
    
    td button {
      padding: 6px 12px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      
      &:hover {
        background: #45a049;
      }
    }
  }

  @media (max-width: 768px) {
    margin: 0;
    
    table {
      display: block;
      width: 100%;
      min-width: unset;
    }
    
    thead {
      display: none;
    }
    
    tbody {
      display: block;
      width: 100%;
    }
    
    tr {
      display: block;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 10px;
    }
    
    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 10px;
      border-bottom: 1px solid #eee;
      text-align: right;
      position: relative;
      padding-left: 50%;
      white-space: normal;
      
      &:last-child {
        border-bottom: none;
      }
      
      &::before {
        content: attr(data-label);
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-weight: bold;
        text-align: left;
      }
    }
  }
`;

const FormSection = styled.div`
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f9f9f9;

  h3 {
    margin-bottom: 15px;
    color: #333;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  div {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const FormButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #45a049;
  }
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #45a049;
  }
`;

const Error = styled.p`
  color: #e74c3c;
  font-size: 12px;
  margin: 4px 0 0;
`;

const ModeSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 140px;
  background: white;
  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const MonthSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 130px;
  background: white;
  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

export default Contacts;