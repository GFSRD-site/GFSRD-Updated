import { useEffect, useState } from "react";
import {
  BellRing,
  Eye,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Send,
  Trash2,
  UserCheck,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  adminLogout,
  deleteAdminContact,
  deleteAdminInternship,
  fetchAdminContacts,
  fetchAdminInternships,
  fetchAdminSubscribers,
  fetchAdminSummary,
  type ContactQuery,
  type DashboardSummary,
  type InternshipApplication,
  type NewsletterSubscriber,
} from "@/lib/api";
import { clearAdminToken, getAdminToken } from "@/lib/adminAuth";

type AdminSection = "overview" | "contacts" | "newsletter" | "internships";

const initialSummary: DashboardSummary = {
  totalContacts: 0,
  pendingContacts: 0,
  totalSubscribers: 0,
  totalInternships: 0,
};

const buildMailtoLink = ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}): string => {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState<AdminSection>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [summary, setSummary] = useState<DashboardSummary>(initialSummary);
  const [contacts, setContacts] = useState<ContactQuery[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [internships, setInternships] = useState<InternshipApplication[]>([]);

  const [selectedContact, setSelectedContact] = useState<ContactQuery | null>(null);
  const [selectedInternship, setSelectedInternship] =
    useState<InternshipApplication | null>(null);

  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterBody, setNewsletterBody] = useState("");

  const token = getAdminToken();

  const handleUnauthorized = (): void => {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  };

  const loadAdminData = async (): Promise<void> => {
    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const [summaryResponse, contactsResponse, subscribersResponse, internshipsResponse] =
        await Promise.all([
          fetchAdminSummary(token),
          fetchAdminContacts(token),
          fetchAdminSubscribers(token),
          fetchAdminInternships(token),
        ]);

      setSummary(summaryResponse.data || initialSummary);
      setContacts(contactsResponse.data || []);
      setSubscribers(subscribersResponse.data || []);
      setInternships(internshipsResponse.data || []);
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : "Failed to load admin data";
      setError(message);
      if (message.toLowerCase().includes("unauthorized")) {
        handleUnauthorized();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      handleUnauthorized();
      return;
    }
    void loadAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async (): Promise<void> => {
    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      await adminLogout(token);
    } catch (_error) {
      // Local cleanup still happens below.
    } finally {
      clearAdminToken();
      navigate("/admin/login", { replace: true });
    }
  };

  const handleDeleteContact = async (id: number): Promise<void> => {
    if (!token) {
      return;
    }

    try {
      setIsBusy(true);
      await deleteAdminContact(token, id);
      setSelectedContact((current) => (current?.id === id ? null : current));
      await loadAdminData();
      setNotice("Contact query deleted.");
    } catch (actionError) {
      setNotice(
        actionError instanceof Error ? actionError.message : "Could not delete contact query.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  const handleDeleteInternship = async (id: number): Promise<void> => {
    if (!token) {
      return;
    }

    try {
      setIsBusy(true);
      await deleteAdminInternship(token, id);
      setSelectedInternship((current) => (current?.id === id ? null : current));
      await loadAdminData();
      setNotice("Internship application deleted.");
    } catch (actionError) {
      setNotice(
        actionError instanceof Error
          ? actionError.message
          : "Could not delete internship application.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  const openContactReply = (contact: ContactQuery): void => {
    const url = buildMailtoLink({
      to: contact.email,
      subject: "Regarding your query to GFSRD",
      body: `Dear ${contact.name},\n\nThank you for contacting GFSRD.\n\nBest regards,\nGFSRD Admin`,
    });
    window.location.href = url;
  };

  const openInternshipReply = (internship: InternshipApplication): void => {
    const url = buildMailtoLink({
      to: internship.email,
      subject: "Regarding your internship interest at GFSRD",
      body: `Dear ${internship.name},\n\nThank you for your internship interest.\n\nBest regards,\nGFSRD Admin`,
    });
    window.location.href = url;
  };

  const navItems: Array<{
    key: AdminSection;
    label: string;
    icon: typeof LayoutDashboard;
  }> = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "contacts", label: "Contacts", icon: MessageSquare },
    { key: "newsletter", label: "Newsletter", icon: BellRing },
    { key: "internships", label: "Internships", icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="md:hidden sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-md border border-border"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-display text-lg font-semibold">Admin Panel</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative h-full w-72 bg-card border-r border-border p-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold">Admin Panel</h2>
              <button onClick={() => setMobileSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setSection(item.key);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors ${
                    section === item.key
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}

      <aside className="hidden md:block fixed top-0 left-0 h-screen w-72 border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <h2 className="font-display text-2xl font-bold text-foreground">Admin Panel</h2>
          <p className="text-sm text-muted-foreground mt-1">GFSRD Management</p>
        </div>
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors ${
                section === item.key
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="md:ml-72">
        <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-10">
          {notice && (
            <Card className="mb-6 p-3 bg-secondary/60 border-border/60 text-sm text-foreground">
              {notice}
            </Card>
          )}

          {error && (
            <Card className="mb-6 p-3 bg-destructive/10 border-destructive/30 text-sm text-destructive">
              {error}
            </Card>
          )}

          {isLoading ? (
            <Card className="p-8 text-center text-muted-foreground">Loading admin data...</Card>
          ) : (
            <>
              {section === "overview" && (
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <Card className="p-5 shadow-soft">
                    <p className="text-sm text-muted-foreground">Total Contacts</p>
                    <p className="text-3xl font-display font-bold mt-2">
                      {summary.totalContacts}
                    </p>
                  </Card>
                  <Card className="p-5 shadow-soft">
                    <p className="text-sm text-muted-foreground">Pending Contacts</p>
                    <p className="text-3xl font-display font-bold mt-2">
                      {summary.pendingContacts}
                    </p>
                  </Card>
                  <Card className="p-5 shadow-soft">
                    <p className="text-sm text-muted-foreground">Subscribers</p>
                    <p className="text-3xl font-display font-bold mt-2">
                      {summary.totalSubscribers}
                    </p>
                  </Card>
                  <Card className="p-5 shadow-soft">
                    <p className="text-sm text-muted-foreground">Internships</p>
                    <p className="text-3xl font-display font-bold mt-2">
                      {summary.totalInternships}
                    </p>
                  </Card>
                </div>
              )}

              {section === "contacts" && (
                <Card className="p-4 md:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl font-semibold">Contact Queries</h3>
                    <Badge variant="outline">{contacts.length} total</Badge>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sender</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Received</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              No contact queries yet.
                            </TableCell>
                          </TableRow>
                        )}
                        {contacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-xs text-muted-foreground">{contact.email}</div>
                            </TableCell>
                            <TableCell className="max-w-[320px] truncate">
                              {contact.message}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  contact.status === "RESPONDED" ? "secondary" : "outline"
                                }
                              >
                                {contact.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="inline-flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedContact(contact)}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => void handleDeleteContact(contact.id)}
                                  disabled={isBusy}
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              )}

              {section === "newsletter" && (
                <Card className="p-4 md:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <h3 className="font-display text-xl font-semibold">Newsletter Subscribers</h3>
                    <Button variant="hero" onClick={() => setPublishModalOpen(true)}>
                      <Send className="w-4 h-4 mr-2" />
                      Publish Newsletter
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Subscribed On</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subscribers.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={2} className="text-center text-muted-foreground">
                              No subscribers found.
                            </TableCell>
                          </TableRow>
                        )}
                        {subscribers.map((subscriber) => (
                          <TableRow key={subscriber.id}>
                            <TableCell className="font-medium">{subscriber.email}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(subscriber.createdAt).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              )}

              {section === "internships" && (
                <Card className="p-4 md:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl font-semibold">
                      Internship Applications
                    </h3>
                    <Badge variant="outline">{internships.length} total</Badge>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Motivation</TableHead>
                          <TableHead>Applied On</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {internships.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              No internship applications yet.
                            </TableCell>
                          </TableRow>
                        )}
                        {internships.map((internship) => (
                          <TableRow key={internship.id}>
                            <TableCell>
                              <div className="font-medium">{internship.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {internship.email}
                              </div>
                            </TableCell>
                            <TableCell>{internship.phone}</TableCell>
                            <TableCell className="max-w-[320px] truncate">
                              {internship.motivation}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(internship.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="inline-flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedInternship(internship)}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    void handleDeleteInternship(internship.id)
                                  }
                                  disabled={isBusy}
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </main>

      <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Query</DialogTitle>
            <DialogDescription>Review details and respond via email.</DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <Card className="p-3">
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedContact.name}</p>
                </Card>
                <Card className="p-3">
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium break-all">{selectedContact.email}</p>
                </Card>
              </div>
              <Card className="p-4 bg-secondary/20 border-border/60">
                <p className="text-sm whitespace-pre-wrap">{selectedContact.message}</p>
              </Card>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="hero"
                  onClick={() => openContactReply(selectedContact)}
                  className="sm:w-auto w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => void handleDeleteContact(selectedContact.id)}
                  disabled={isBusy}
                  className="sm:w-auto w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedInternship}
        onOpenChange={(open) => !open && setSelectedInternship(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Internship Application</DialogTitle>
            <DialogDescription>Review applicant details and respond via email.</DialogDescription>
          </DialogHeader>
          {selectedInternship && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <Card className="p-3">
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedInternship.name}</p>
                </Card>
                <Card className="p-3">
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium break-all">{selectedInternship.email}</p>
                </Card>
                <Card className="p-3">
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedInternship.phone}</p>
                </Card>
                <Card className="p-3">
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedInternship.location || "-"}</p>
                </Card>
                <Card className="p-3">
                  <p className="text-muted-foreground">Education</p>
                  <p className="font-medium">{selectedInternship.education || "-"}</p>
                </Card>
                <Card className="p-3">
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium">{selectedInternship.experience || "-"}</p>
                </Card>
              </div>
              <Card className="p-4 bg-secondary/20 border-border/60">
                <p className="text-sm whitespace-pre-wrap">{selectedInternship.motivation}</p>
              </Card>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="hero"
                  onClick={() => openInternshipReply(selectedInternship)}
                  className="sm:w-auto w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => void handleDeleteInternship(selectedInternship.id)}
                  disabled={isBusy}
                  className="sm:w-auto w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={publishModalOpen} onOpenChange={setPublishModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Publish Newsletter</DialogTitle>
            <DialogDescription>
              UI is ready. Integrate send logic when your mail service is connected.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={newsletterSubject}
              onChange={(event) => setNewsletterSubject(event.target.value)}
              placeholder="Newsletter subject"
            />
            <Textarea
              rows={8}
              value={newsletterBody}
              onChange={(event) => setNewsletterBody(event.target.value)}
              placeholder="Write newsletter content..."
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="hero"
                className="sm:w-auto w-full"
                onClick={() => {
                  setNotice("Publish logic pending backend/mail provider integration.");
                  setPublishModalOpen(false);
                }}
              >
                Publish (Coming Soon)
              </Button>
              <Button
                variant="outline"
                className="sm:w-auto w-full"
                onClick={() => setPublishModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
