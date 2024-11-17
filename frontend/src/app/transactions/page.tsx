'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon, Edit2Icon, SortAscIcon, Trash2Icon, User } from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const mockTransactions = [
  { id: 1, amount: 50.00, category: 'Food', description: 'Grocery shopping', timestamp: '2023-06-01T10:30:00', type: 'expense' },
  { id: 2, amount: 1000.00, category: 'Income', description: 'Salary', timestamp: '2023-06-01T09:00:00', type: 'income' },
  { id: 3, amount: 30.00, category: 'Entertainment', description: 'Movie tickets', timestamp: '2023-06-02T19:45:00', type: 'expense' },
  { id: 4, amount: 500.00, category: 'Rent', description: 'Monthly rent', timestamp: '2023-06-03T12:00:00', type: 'expense' },
  { id: 5, amount: 20.00, category: 'Transportation', description: 'Bus fare', timestamp: '2023-06-04T08:30:00', type: 'expense' },
]

export default function AllTransactions() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [sortField, setSortField] = useState('timestamp')
  const [sortDirection, setSortDirection] = useState('desc')

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedTransactions = [...transactions].sort((a:any, b:any) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Edit transaction with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log(`Delete transaction with id: ${id}`)
    setTransactions(transactions.filter(transaction => transaction.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">View All Transactions</h1>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort('amount')}>
                      Amount
                      {sortField === 'amount' && (
                        sortDirection === 'asc' ? <SortAscIcon className="ml-2 h-4 w-4" /> : <ArrowDownIcon className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('category')}>
                      Category
                      {sortField === 'category' && (
                        sortDirection === 'asc' ? <SortAscIcon className="ml-2 h-4 w-4" /> : <ArrowDownIcon className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="max-w-[150px]">Description</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('timestamp')}>
                      Date
                      {sortField === 'timestamp' && (
                        sortDirection === 'asc' ? <SortAscIcon className="ml-2 h-4 w-4" /> : <ArrowDownIcon className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('type')}>
                      Type
                      {sortField === 'type' && (
                        sortDirection === 'asc' ? <SortAscIcon className="ml-2 h-4 w-4" /> : <ArrowDownIcon className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{transaction.description}</TableCell>
                    <TableCell>{new Date(transaction.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(transaction.id)}>
                          <Edit2Icon className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(transaction.id)}>
                          <Trash2Icon className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-4 flex items-center justify-between">
          <Button variant="outline" size="sm">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
            <span className="font-medium">20</span> results
          </div>
          <Button variant="outline" size="sm">
            Next
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}