import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md industrial-card border-t-4 border-t-primary">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary rounded flex items-center justify-center text-primary-foreground mb-2">
            <ChefHat size={24} />
          </div>
          <CardTitle className="text-2xl font-display">Cozinha Saí</CardTitle>
          <CardDescription>Sistema de Gestão de Produção e Estoque</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail de Acesso</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Dica: Use <strong>cardumecozinha@gmail.com</strong> para acesso operacional.</p>
                <p>Use <strong>cdm@cardumecozinha.com</strong> para acesso gerencial.</p>
              </div>
            </div>
            <Button type="submit" className="w-full font-bold">
              Entrar no Sistema
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
