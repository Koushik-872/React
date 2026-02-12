import { createSlice } from '@reduxjs/toolkit';
import { contactData } from '../utils/contactData';

const initialState = {
  data: contactData,
  searchTerm: '',
  filterField: 'name',
  // date filter mode: 'date' (day range), 'month' (month range), 'year' (single year or range)
  dateFilterMode: 'date',
  startDate: '',
  endDate: '',
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.data.unshift(action.payload); 
    },
    editContact: (state, action) => {
      const index = state.data.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterField: (state, action) => {
      state.filterField = action.payload;
      state.searchTerm = ''; 
      state.startDate = ''; 
      state.endDate = '';
      state.dateFilterMode = 'date';
    },
    setDateFilterMode: (state, action) => {
      state.dateFilterMode = action.payload;
      
      state.startDate = '';
      state.endDate = '';
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    }
  },
});

export const {
  addContact,
  editContact,
  setSearchTerm,
  setFilterField,
  setStartDate,
  setEndDate,
  setDateFilterMode
} = contactSlice.actions;

export const selectFilteredContacts = (state) => {
  const { searchTerm, data, filterField, startDate, endDate, dateFilterMode } = state.contacts;

  // Handle date filtering for Created Date with different modes
  if (filterField === 'createdDate' && (startDate || endDate)) {
    return data.filter(contact => {
      // Parse contact created date in DD/MM/YYYY
      const parts = contact.createdDate.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      if (dateFilterMode === 'month') {
        // startDate/endDate expected to be month numbers '01'..'12' (we only compare month, ignore year)
        const contactMonth = month; // 1..12
        const startM = startDate ? parseInt(startDate, 10) : 1;
        const endM = endDate ? parseInt(endDate, 10) : 12;
        if (startM <= endM) {
          return contactMonth >= startM && contactMonth <= endM;
        }
        // wrap-around e.g., Nov (11) to Feb (2)
        return contactMonth >= startM || contactMonth <= endM;
      }

      if (dateFilterMode === 'year') {
        // startDate/endDate expected as year strings (e.g., '2026')
        const contactYear = year;
        const startY = startDate ? parseInt(startDate, 10) : -Infinity;
        const endY = endDate ? parseInt(endDate, 10) : Infinity;
        return contactYear >= startY && contactYear <= endY;
      }

      // default 'date' mode: startDate/endDate are ISO date strings (YYYY-MM-DD)
      const contactDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
      const start = startDate ? new Date(startDate) : new Date('1900-01-01');
      const end = endDate ? new Date(endDate) : new Date('2100-12-31');
      return contactDate >= start && contactDate <= end;
    });
  }

  // Handle text search filtering
  if (!searchTerm) return data;

  const q = searchTerm.toLowerCase();
  // Global search across all fields when filterField === 'all'
  if (filterField === 'all') {
    return data.filter(contact =>
      Object.keys(contact).some(key => {
        const val = contact[key];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(q);
      })
    );
  }

  return data.filter(contact =>
    String(contact[filterField]?.toLowerCase()).includes(q)
  );
};

export default contactSlice.reducer;