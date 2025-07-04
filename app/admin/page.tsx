"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Users, MessageSquare, Calendar, MapPin, Clock, User, Download } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

interface SessionData {
  session_id: string
  created_at: string
  mood: string
  brings_here_today: string
  treatment_matters: string[]
  touch_style: string
  therapist_preference: string
  session_location: string
  preferred_time: string
  conversation_style: string
  additional_notes: string
  scent_preferences: string
  contact_info: string
  location_live: string
  experience_rating: number
  wants_scent_info: boolean
  language?: string
}

interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  message: string
  created_at: string
  read: boolean
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [sessions, setSessions] = useState<SessionData[]>([])
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(false)

  const ADMIN_PASSWORD = "TherapeuticScents2024!" // Change this to your desired password

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_authenticated', 'true')
      fetchData()
    } else {
      alert('Incorrect password')
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('sessions')
        .select('*')
        .order('created_at', { ascending: false })

      if (sessionsError) {
        console.error('Error fetching sessions:', sessionsError)
      } else {
        setSessions(sessionsData || [])
      }

      // Fetch contact messages
      const { data: contactsData, error: contactsError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (contactsError) {
        console.error('Error fetching contacts:', contactsError)
      } else {
        setContacts(contactsData || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', messageId)

      if (!error) {
        setContacts(contacts.map(contact => 
          contact.id === messageId ? { ...contact, read: true } : contact
        ))
      }
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const exportToCSV = (data: any[], filename: string) => {
    const replacer = (key: any, value: any) => value === null ? '' : value
    const header = Object.keys(data[0])
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    const csvArray = csv.join('\r\n')

    const a = document.createElement('a')
    const blob = new Blob([csvArray], {type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)

    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_authenticated')
    setPassword('')
  }

  // Check if already authenticated on page load
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated')
    if (isAuth === 'true') {
      setIsAuthenticated(true)
      fetchData()
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Contact Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Unread Messages</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contacts.filter(c => !c.read).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="sessions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Sessions
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => exportToCSV(sessions, 'sessions.csv')} disabled={sessions.length === 0}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Session ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Mood</TableHead>
                          <TableHead>Purpose</TableHead>
                          <TableHead>Treatment Matters</TableHead>
                          <TableHead>Touch Style</TableHead>
                          <TableHead>Therapist Pref</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Preferred Time</TableHead>
                          <TableHead>Conversation Style</TableHead>
                          <TableHead>Additional Notes</TableHead>
                          <TableHead>Scent Preferences</TableHead>
                          <TableHead>Contact Info</TableHead>
                          <TableHead>Rating</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sessions.map((session) => (
                          <TableRow key={session.session_id}>
                            <TableCell className="font-mono text-sm">
                              {session.session_id?.substring(0, 8)}...
                            </TableCell>
                            <TableCell>
                              {new Date(session.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{session.mood || 'N/A'}</Badge>
                            </TableCell>
                            <TableCell>{session.brings_here_today || 'N/A'}</TableCell>
                            <TableCell>
                              {Array.isArray(session.treatment_matters) 
                                ? session.treatment_matters.join(', ') 
                                : (session.treatment_matters || 'N/A')}
                            </TableCell>
                            <TableCell>{session.touch_style || 'N/A'}</TableCell>
                            <TableCell>{session.therapist_preference || 'N/A'}</TableCell>
                            <TableCell>{session.session_location || 'N/A'}</TableCell>
                            <TableCell>{session.preferred_time || 'N/A'}</TableCell>
                            <TableCell>{session.conversation_style || 'N/A'}</TableCell>
                            <TableCell className="max-w-xs truncate">{session.additional_notes || 'N/A'}</TableCell>
                            <TableCell>{session.scent_preferences || 'N/A'}</TableCell>
                            <TableCell className="font-mono text-sm">
                              {session.contact_info || 'N/A'}
                            </TableCell>
                            <TableCell>
                              {session.experience_rating ? `${session.experience_rating} / 10` : 'N/A'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Contact Messages
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => exportToCSV(contacts, 'contacts.csv')} disabled={contacts.length === 0}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell className="font-medium">{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone || 'N/A'}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {contact.message}
                            </TableCell>
                            <TableCell>
                              {new Date(contact.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={contact.read ? "default" : "destructive"}>
                                {contact.read ? "Read" : "Unread"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {!contact.read && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => markAsRead(contact.id)}
                                >
                                  Mark as Read
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Refresh Button */}
        <div className="flex justify-center mt-8">
          <Button onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Data'}
          </Button>
        </div>
      </div>
    </div>
  )
} 