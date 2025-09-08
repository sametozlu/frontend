import UsersTable from '../components/users/UsersTable'

export default function UsersPage() {
  return (
    <div>
      <div className="mb-6">
        <h2>👥 Users Management</h2>
        <p className="text-gray-600">
          Manage your users with full CRUD operations. Click on a user's name to view their details and posts.
        </p>
      </div>
      <UsersTable />
    </div>
  )
}


