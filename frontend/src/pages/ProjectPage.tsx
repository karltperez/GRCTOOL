import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsAPI, assetsAPI } from '../services/api';
import { FiArrowLeft } from 'react-icons/fi';

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewAssetForm, setShowNewAssetForm] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', type: '', description: '' });

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const projectRes = await projectsAPI.getById(id!);
      setProject(projectRes.data);

      const assetsRes = await assetsAPI.getByProject(id!);
      setAssets(assetsRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assetsAPI.create(id!, newAsset.name, newAsset.type, newAsset.description);
      setNewAsset({ name: '', type: '', description: '' });
      setShowNewAssetForm(false);
      fetchData();
    } catch (error) {
      console.error('Failed to create asset', error);
    }
  };

  if (loading) return <p className="text-center py-12">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
          >
            <FiArrowLeft /> Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project?.name}</h1>
            <p className="text-gray-600 mt-1">{project?.description}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Assets & Inventory</h2>

          <button
            onClick={() => setShowNewAssetForm(!showNewAssetForm)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition mb-4"
          >
            + Add Asset
          </button>

          {showNewAssetForm && (
            <div className="mb-6 p-6 bg-white rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Add New Asset</h3>
              <form onSubmit={handleCreateAsset}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Asset Name</label>
                  <input
                    type="text"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Type</label>
                  <select
                    value={newAsset.type}
                    onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Server">Server</option>
                    <option value="Database">Database</option>
                    <option value="Application">Application</option>
                    <option value="Network">Network</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea
                    value={newAsset.description}
                    onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                  >
                    Add Asset
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewAssetForm(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {assets.length === 0 ? (
            <p className="text-gray-600">No assets yet. Add one to get started!</p>
          ) : (
            <div className="grid gap-4">
              {assets.map((asset) => (
                <div key={asset.id} className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-bold text-lg text-gray-900">{asset.name}</h3>
                  <p className="text-sm text-gray-600">Type: {asset.type}</p>
                  <p className="text-sm text-gray-600 mt-2">{asset.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
