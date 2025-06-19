import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Header } from "@/components/Header"; // Importez le Header

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;
  const initiales = user.name?.charAt(0).toUpperCase() ?? <User className="h-12 w-12" />;

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-rose-50 via-white to-purple-50 min-h-screen p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto mt-8">
          <Card className="shadow-xl border-t-4 border-rose-500">
            <CardHeader className="text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <Avatar className="h-full w-full border-4 border-white shadow-lg">
                  <AvatarImage src={user.image ?? undefined} alt={user.name ?? "Avatar"} />
                  <AvatarFallback className="text-4xl bg-gray-200">
                    {initiales}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-3xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Informations du compte</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Nom d'utilisateur:</span>
                    <span className="text-gray-800">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Email:</span>
                    <span className="text-gray-800">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">ID Utilisateur:</span>
                    <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{user.id}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}