import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Upload, ChevronLeft, ChevronRight, Delete } from 'lucide-react';
import axios from 'axios';
import { Sidebar } from '../widgets/layout/sidebar';
import { useLoading, Audio } from '@agney/react-loading';
import DeleteConfirmationModal from '@/widgets/cards/deleteModal';
import SuccessDeleteModal from '@/widgets/cards/deleteAlertModal';

export function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("")
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      axios.delete(`${import.meta.env.VITE_API_BASE}/user/delete/${userId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log("User deleted:", response.data);
        })
        .catch(error => {
          console.error("Delete error:", error);
        });
      // Close modal
      setIsModalOpen(false);
      setItemToDelete(null);
      handleDelete()

    } catch (error) {
      console.error('Delete failed:', error);
      alert('Gagal menghapus data!');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      axios.get(import.meta.env.VITE_API_BASE + '/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {
          if (response.data.isSucces) {
            console.log("Users fetched successfully", response.data.data);
            setUsers(response.data.data);
          } else {
            console.error("Failed to fetch users", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching users", error);
        });
    } catch (error) {
      console.error("Error in getAllUsers", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Simulate loading delay
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filtered = users.filter(users =>
    // users.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    users.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(users.map(c => c.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectCustomer = (customerId) => {
    if (selected.includes(customerId)) {
      setSelected(selected.filter(id => id !== customerId));
    } else {
      setSelected([...selected, customerId]);
    }
  };

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="50" />,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div {...containerProps} className="flex items-center justify-center">
          {indicatorEl}
        </div>
      </div>
    );
  } else {
    return (

      <div className="flex min-h-screen bg-gray-50">
        {/* Loading */}

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">

            {/* Actions Bar */}
            <div className="flex items-center justify-between space-x-4 mb-5">
              <div className='flex items-center space-x-2'>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={handleSelectAll}
                        checked={selected.length === users.length}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signed Up</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selected.includes(customer.id)}
                          onChange={() => handleSelectCustomer(customer.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-90">
                            {customer.username ? customer.username : '-'}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600">{customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.currencyChoice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(customer.createdAt._seconds * 1000).toLocaleString()}
                        </div>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => {
                              handleDeleteClick(customer.email);
                              setUserId(customer.userId);
                            }}
                            className="text-red-600 hover:text-red-800">
                            <Delete className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="bg-white px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">Rows per page:</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => setRowsPerPage(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                    <span className="text-sm text-gray-700 ml-4">1-5 of 5</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          title="Konfirmasi Hapus Data"
          message="Apakah Anda yakin ingin menghapus item ini? Data yang dihapus tidak dapat dikembalikan."
          itemName={itemToDelete}
          isLoading={isDeleting}
        />
        <SuccessDeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        itemName={itemToDelete}
        autoClose={true}
        autoCloseDelay={4000}
      />
      </div>


    );
  };
}

export default CustomerManagement;