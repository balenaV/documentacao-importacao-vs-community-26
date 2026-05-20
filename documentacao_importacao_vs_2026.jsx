import React from "react";
import { CheckCircle2, Database, FolderTree, Package, PlayCircle, Terminal, Wrench, AlertTriangle } from "lucide-react";

const CodeBlock = ({ children, lang = "" }) => (
  <pre className="mt-3 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100 shadow-inner">
    <code>{children}</code>
  </pre>
);

const Section = ({ id, icon: Icon, title, children }) => (
  <section id={id} className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center gap-3">
      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
        <Icon size={22} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    <div className="space-y-4 text-slate-700">{children}</div>
  </section>
);

const NavItem = ({ href, children }) => (
  <a href={href} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
    {children}
  </a>
);

export default function DocumentacaoImportacao() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">Documentação Técnica</p>
            <h1 className="text-xl font-bold">Padrão de Importação VS 2026 sem EDMX</h1>
          </div>
          <nav className="hidden gap-1 md:flex">
            <NavItem href="#visao-geral">Visão geral</NavItem>
            <NavItem href="#nuget">NuGet</NavItem>
            <NavItem href="#estrutura">Estrutura</NavItem>
            <NavItem href="#scaffold">Scaffold</NavItem>
            <NavItem href="#program">Program.cs</NavItem>
            <NavItem href="#boas-praticas">Boas práticas</NavItem>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-bold text-slate-500">Navegação</p>
            <div className="flex flex-col gap-1">
              <NavItem href="#visao-geral">1. Visão geral</NavItem>
              <NavItem href="#criar-projeto">2. Criar projeto</NavItem>
              <NavItem href="#nuget">3. Pacotes NuGet</NavItem>
              <NavItem href="#appsettings">4. appsettings.json</NavItem>
              <NavItem href="#estrutura">5. Estrutura padrão</NavItem>
              <NavItem href="#scaffold">6. Scaffold do banco</NavItem>
              <NavItem href="#program">7. Program.cs</NavItem>
              <NavItem href="#importador">8. Importador</NavItem>
              <NavItem href="#boas-praticas">9. Boas práticas</NavItem>
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <section className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-xl">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-slate-100">
                Substituindo EDMX por EF Core Scaffold
              </p>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Como criar um projeto de importação moderno no Visual Studio 2026
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                Este guia mostra o padrão recomendado para criar importações em C# usando .NET 8, EF Core 8, Pomelo MySQL e Scaffold-DbContext, sem depender de EDMX.
              </p>
            </div>
          </section>

          <Section id="visao-geral" icon={Database} title="1. Visão geral do padrão">
            <p>
              O padrão antigo usava <strong>EDMX</strong>, <strong>MySql.Data</strong> e <strong>MySql.Data.EntityFramework</strong>. No novo padrão, o banco destino é gerado por comando usando <strong>Scaffold-DbContext</strong>.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                <h3 className="font-bold text-red-900">Antigo</h3>
                <p className="mt-2 text-sm text-red-800">EDMX, designer visual, MySql.Data.EntityFramework e maior dependência do Visual Studio 2019.</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <h3 className="font-bold text-emerald-900">Novo</h3>
                <p className="mt-2 text-sm text-emerald-800">EF Core, Pomelo, classes C# geradas via Scaffold e compatibilidade melhor com VS 2026.</p>
              </div>
            </div>
          </Section>

          <Section id="criar-projeto" icon={PlayCircle} title="2. Criar o projeto">
            <p>No Visual Studio 2026, crie um projeto do tipo:</p>
            <CodeBlock>{`Console App
Framework: .NET 8
Nome sugerido: ImportacaoClienteX`}</CodeBlock>
            <p>Mesmo usando VS 2026, o recomendado é usar <strong>.NET 8</strong> para manter compatibilidade estável com EF Core 8 e Pomelo 8.</p>
          </Section>

          <Section id="nuget" icon={Package} title="3. Pacotes NuGet padrão">
            <p>Instale estes pacotes no Package Manager Console:</p>
            <CodeBlock>{`Install-Package Microsoft.EntityFrameworkCore -Version 8.0.8
Install-Package Microsoft.EntityFrameworkCore.Design -Version 8.0.8
Install-Package Microsoft.EntityFrameworkCore.Tools -Version 8.0.8
Install-Package Pomelo.EntityFrameworkCore.MySql -Version 8.0.2
Install-Package Microsoft.Extensions.Configuration -Version 8.0.0
Install-Package Microsoft.Extensions.Configuration.Json -Version 8.0.0
Install-Package Microsoft.Extensions.Configuration.FileExtensions -Version 8.0.0`}</CodeBlock>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5" size={20} />
                <p>Evite misturar EF Core 8 com Tools 10 ou Configuration 10 nesse padrão. Mantenha tudo alinhado em versão 8.</p>
              </div>
            </div>
          </Section>

          <Section id="appsettings" icon={Wrench} title="4. Criar o appsettings.json">
            <p>Crie o arquivo <strong>appsettings.json</strong> na raiz do projeto:</p>
            <CodeBlock>{`{
  "ConnectionStrings": {
    "Destino": "Server=localhost;Database=virgem10;User=root;Password=SUA_SENHA;Port=3366;Default Command Timeout=1000;"
  }
}`}</CodeBlock>
            <p>Depois, nas propriedades do arquivo, configure:</p>
            <CodeBlock>{`Copy to Output Directory = Copy if newer`}</CodeBlock>
          </Section>

          <Section id="estrutura" icon={FolderTree} title="5. Estrutura padrão de pastas">
            <p>Use uma estrutura simples e previsível:</p>
            <CodeBlock>{`NomeDoProjeto/
│
├── Destino/
│   ├── DestinoContext.cs
│   ├── Produto.cs
│   ├── Pessoa.cs
│   └── demais entidades geradas pelo Scaffold
│
├── Origem/
│   └── classes de leitura da origem
│
├── Importadores/
│   ├── ImportadorCliente.cs
│   ├── ImportadorProduto.cs
│   └── ImportadorVenda.cs
│
├── Utils/
│   └── funções auxiliares
│
├── appsettings.json
└── Program.cs`}</CodeBlock>
          </Section>

          <Section id="scaffold" icon={Terminal} title="6. Gerar o banco destino com Scaffold">
            <p>Esse comando substitui o antigo EDMX:</p>
            <CodeBlock>{`Scaffold-DbContext "Server=localhost;Database=virgem10;User=root;Password=SUA_SENHA;Port=3366;Default Command Timeout=1000;" Pomelo.EntityFrameworkCore.MySql -OutputDir Destino -Context DestinoContext -Force -NoOnConfiguring`}</CodeBlock>
            <p>Para gerar somente algumas tabelas:</p>
            <CodeBlock>{`Scaffold-DbContext "Server=localhost;Database=virgem10;User=root;Password=SUA_SENHA;Port=3366;Default Command Timeout=1000;" Pomelo.EntityFrameworkCore.MySql -OutputDir Destino -Context DestinoContext -Force -NoOnConfiguring -Tables produto,pessoa,pedido,pedidoproduto`}</CodeBlock>
          </Section>

          <Section id="program" icon={CheckCircle2} title="7. Program.cs padrão">
            <p>Modelo base para iniciar o contexto do banco destino:</p>
            <CodeBlock>{`using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NomeDoProjeto.Destino;
using NomeDoProjeto.Importadores;

var configuration = new ConfigurationBuilder()
    .SetBasePath(AppContext.BaseDirectory)
    .AddJsonFile("appsettings.json", optional: false)
    .Build();

var connectionString = configuration.GetConnectionString("Destino");

var options = new DbContextOptionsBuilder<DestinoContext>()
    .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
    .Options;

using var destino = new DestinoContext(options);

Console.WriteLine("Conectado ao banco destino.");

var importador = new ImportadorCliente(destino);
importador.Importar();

Console.WriteLine("Processo finalizado.");`}</CodeBlock>
          </Section>

          <Section id="importador" icon={Database} title="8. Classe importadora padrão">
            <p>Exemplo simples de importador com leitura CSV e gravação em lote:</p>
            <CodeBlock>{`using NomeDoProjeto.Destino;

namespace NomeDoProjeto.Importadores;

public class ImportadorCliente
{
    private readonly DestinoContext _destino;

    public ImportadorCliente(DestinoContext destino)
    {
        _destino = destino;
    }

    public void Importar()
    {
        var clientes = GetCSV(@"C:\\Importacao\\clientes.csv");

        int contador = 0;
        int count = clientes.Count;

        Console.WriteLine($"Total de clientes: {count}");

        foreach (var antCli in clientes)
        {
            contador++;

            var novoCliente = new Pessoa
            {
                Isativo = true,
                Datacadastro = DateTime.Now,
                Nomerazaosocial = antCli[0],
                Cpfcnpj = antCli[1]
            };

            _destino.Pessoas.Add(novoCliente);

            if (contador % 500 == 0)
            {
                _destino.SaveChanges();
                _destino.ChangeTracker.Clear();
                Console.WriteLine($"{contador} clientes importados...");
            }
        }

        _destino.SaveChanges();
        _destino.ChangeTracker.Clear();

        Console.WriteLine("Importação de clientes finalizada.");
    }

    private static List<string[]> GetCSV(string caminho)
    {
        return File.ReadAllLines(caminho)
            .Skip(1)
            .Where(linha => !string.IsNullOrWhiteSpace(linha))
            .Select(linha => linha.Split(';'))
            .ToList();
    }
}`}</CodeBlock>
          </Section>

          <Section id="boas-praticas" icon={CheckCircle2} title="9. Boas práticas para importações rápidas">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Evite consultar o banco dentro do foreach.",
                "Use AsNoTracking() para consultas somente leitura.",
                "Use Dictionary para buscar produtos, clientes e pedidos em memória.",
                "Use SaveChanges em lote, por exemplo a cada 500 registros.",
                "Use ChangeTracker.Clear() após salvar cada lote.",
                "Não edite manualmente as classes geradas na pasta Destino."
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} />
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <p>Exemplo de carregamento rápido em memória:</p>
            <CodeBlock>{`var produtos = _destino.Produtos
    .AsNoTracking()
    .Where(p => p.Referenciapadrao != null)
    .ToList()
    .GroupBy(p => p.Referenciapadrao)
    .ToDictionary(g => g.Key, g => g.First());

produtos.TryGetValue(codigoProduto, out var produto);`}</CodeBlock>
          </Section>
        </div>
      </main>
    </div>
  );
}
