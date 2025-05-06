
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Ticket } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Profil Saya</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Informasi Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Nama Lengkap</div>
              <div className="font-medium">{user.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{user.email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">ID Pengguna</div>
              <div className="font-medium">{user.id}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => logout()}>
              Keluar
            </Button>
          </CardFooter>
        </Card>
        
        {/* Tickets Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ticket className="mr-2 h-5 w-5" />
              Tiket Saya
            </CardTitle>
            <CardDescription>
              Tiket yang telah Anda pesan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Ticket className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">Belum ada tiket</h3>
              <p className="text-muted-foreground">
                Anda belum memiliki tiket yang dipesan. Mulai jelajahi destinasi budaya Indonesia sekarang!
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => navigate("/destinations")}>
              Jelajahi Destinasi
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
