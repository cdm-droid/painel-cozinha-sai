import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat, Lock, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const success = login(email, password);
      if (!success) {
        toast.error("Credenciais inválidas. Verifique e-mail e senha.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md industrial-card border-t-4 border-t-primary">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto">
            <img src="/logo-sai.webp" alt="Saí Burguer" className="w-24 h-24 object-contain mx-auto" />
          </div>
          <div>
            <CardTitle className="text-2xl font-display">Painel da Cozinha</CardTitle>
            <CardDescription className="mt-1">Sistema de Gestão de Produção e Estoque</CardDescription>
          </div>
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••" 
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
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
