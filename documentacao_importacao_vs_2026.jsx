import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  FileText,
  FolderTree,
  Package,
  PlayCircle,
  Server,
  Terminal,
  Wrench,
} from "lucide-react";

const CodeBlock = ({ children }) => (
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
  <a
    href={href}
    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
  >
    {children}
  </a>
);

const SystemCard = ({ title, type, status, children }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-3 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm font-medium text-slate-500">{type}</p>
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{status}</span>
    </div>
    <div className="text-sm leading-6 text-slate-700">{children}</div>
  </div>
);

export default function DocumentacaoImportacaoInfinitSolucoes() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">Documentação Técnica</p>
            <h1 className="text-xl font-bold">Documentação importação de dados Infinit Soluções</h1>
          </div>
          <nav className="hidden gap-1 md:flex">
            <NavItem href="#visao-geral">Visão geral</NavItem>
            <NavItem href="#comercial">Comercial</NavItem>
            <NavItem href="#plus">Plus</NavItem>
            <NavItem href="#velo">Velo</NavItem>
            <NavItem href="#avante">Avante</NavItem>
            <NavItem href="#boas-praticas">Boas práticas</NavItem>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[270px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-bold text-slate-500">Navegação</p>
            <div className="flex flex-col gap-1">
              <NavItem href="#visao-geral">1. Visão geral</NavItem>
              <NavItem href="#criar-projeto">2. Criar projeto</NavItem>
              <NavItem href="#estrutura">3. Estrutura padrão</NavItem>
              <NavItem href="#comercial">4. Comercial - MySQL</NavItem>
              <NavItem href="#plus">5. Plus - SQL Server</NavItem>
              <NavItem href="#velo">6. Velo</NavItem>
              <NavItem href="#avante">7. Avante</NavItem>
              <NavItem href="#csv-exemplos">8. Exemplos CSV</NavItem>
              <NavItem href="#firebird-exemplos">9. Exemplos Firebird</NavItem>
              <NavItem href="#boas-praticas">10. Boas práticas</NavItem>
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <section className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-xl">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-slate-100">
                Padrão interno de importação
              </p>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Documentação importação de dados Infinit Soluções
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                Guia base para criação de projetos de importação usando C#, EF Core, Scaffold-DbContext,
                leitura CSV, origem Firebird quando necessário, destino Comercial em MySQL e destino Plus em SQL Server.
              </p>
            </div>
          </section>

          <Section id="visao-geral" icon={Database} title="1. Visão geral do padrão">
            <p>
              O padrão do projeto é manter uma única classe <strong>Importador.cs</strong> com métodos separados por entidade,
              como <strong>Cliente()</strong>, <strong>Produto()</strong>, <strong>Portador()</strong> e <strong>GradeProduto()</strong>.
              O <strong>Program.cs</strong> fica responsável por criar as conexões e entregar os contextos prontos para o importador.
            </p>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <SystemCard title="Comercial" type="Destino MySQL" status="Documentado">
                Usado nas importações para o banco Comercial. Mantém Pomelo, MySQL e senha padrão <strong>genesysjp</strong> nos exemplos.
              </SystemCard>
              <SystemCard title="Plus" type="Destino SQL Server" status="Foco atual">
                Usado nas importações para SQL Server. Usuário padrão <strong>sa</strong> e senha <strong>genesysjp</strong> nos exemplos.
              </SystemCard>
              <SystemCard title="Velo" type="SQL Server" status="Reservado">
                Aba reservada para documentação futura. Por enquanto, manter vazio ou somente com placeholder.
              </SystemCard>
              <SystemCard title="Avante" type="SQL Server" status="Reservado">
                Aba reservada para documentação futura. Por enquanto, manter vazio ou somente com placeholder.
              </SystemCard>
            </div>
          </Section>

          <Section id="criar-projeto" icon={PlayCircle} title="2. Criar o projeto">
            <p>No Visual Studio, crie um projeto do tipo:</p>
            <CodeBlock>{`Console App
Framework: .NET 8
Nome sugerido: ImportacaoClienteX`}</CodeBlock>
            <p>
              O padrão recomendado é usar <strong>.NET 8</strong>, mantendo os pacotes do EF Core na versão 8.x para evitar conflito de versão.
            </p>
          </Section>

          <Section id="estrutura" icon={FolderTree} title="3. Estrutura padrão do projeto">
            <p>Use uma estrutura simples, separando origem e destino quando houver banco de origem.</p>
            <CodeBlock>{`NomeDoProjeto/
│
├── Destino/
│   ├── DestinoContext.cs
│   ├── Produto.cs
│   ├── Pessoa.cs
│   └── demais entidades geradas pelo Scaffold
│
├── Origem/
│   ├── OrigemContext.cs
│   └── entidades da origem, quando a origem também for banco
│
├── Importador.cs
└── Program.cs`}</CodeBlock>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5" size={20} />
                <p>
                  Quando a origem for CSV, não precisa criar pasta <strong>Origem</strong>. Nesse caso, o importador recebe somente o contexto do destino.
                </p>
              </div>
            </div>
          </Section>

          <Section id="comercial" icon={Server} title="4. Aba Comercial - MySQL">
            <p>
              Essa aba é para importações cujo destino é o banco <strong>Comercial</strong>, usando MySQL.
              A senha padrão nos exemplos já está definida como <strong>genesysjp</strong>.
            </p>

            <h3 className="text-lg font-bold text-slate-900">Pacotes NuGet - Comercial MySQL</h3>
            <CodeBlock>{`Install-Package Microsoft.EntityFrameworkCore -Version 8.0.8
Install-Package Microsoft.EntityFrameworkCore.Design -Version 8.0.8
Install-Package Microsoft.EntityFrameworkCore.Tools -Version 8.0.8
Install-Package Pomelo.EntityFrameworkCore.MySql -Version 8.0.2
Install-Package Microsoft.Extensions.Configuration -Version 8.0.0
Install-Package Microsoft.Extensions.Configuration.Json -Version 8.0.0
Install-Package Microsoft.Extensions.Configuration.FileExtensions -Version 8.0.0`}</CodeBlock>

            <h3 className="text-lg font-bold text-slate-900">Scaffold do destino Comercial</h3>
            <CodeBlock>{`Scaffold-DbContext "Server=localhost;Database=virgem10;User=root;Password=genesysjp;Port=3366;Default Command Timeout=1000;" Pomelo.EntityFrameworkCore.MySql -OutputDir Destino -Context DestinoContext -Force -NoOnConfiguring`}</CodeBlock>

            <h3 className="text-lg font-bold text-slate-900">Program.cs - CSV para Comercial</h3>
            <CodeBlock>{`using Microsoft.EntityFrameworkCore;
using NomeDoProjeto.Destino;

string connectionDestino =
    "Server=localhost;Database=virgem10;User=root;Password=genesysjp;Port=3366;Default Command Timeout=1000;";

var optionsDestino = new DbContextOptionsBuilder<DestinoContext>()
    .UseMySql(connectionDestino, ServerVersion.AutoDetect(connectionDestino))
    .Options;

using var destino = new DestinoContext(optionsDestino);

destino.ChangeTracker.AutoDetectChangesEnabled = false;

Console.WriteLine("Iniciando importação Comercial...");

var importador = new Importador(destino);
importador.GradeProduto();

Console.WriteLine("Importação Comercial finalizada.");
Console.ReadKey();`}</CodeBlock>

            <h3 className="text-lg font-bold text-slate-900">Program.cs - Firebird para Comercial</h3>
            <CodeBlock>{`using Microsoft.EntityFrameworkCore;
using NomeDoProjeto.Destino;

string connectionDestino =
    "Server=localhost;Database=virgem10;User=root;Password=genesysjp;Port=3366;Default Command Timeout=1000;";

var optionsDestino = new DbContextOptionsBuilder<DestinoContext>()
    .UseMySql(connectionDestino, ServerVersion.AutoDetect(connectionDestino))
    .Options;

using var destino = new DestinoContext(optionsDestino);

destino.ChangeTracker.AutoDetectChangesEnabled = false;

Console.WriteLine("Iniciando importação Firebird para Comercial...");

var importador = new Importador(destino);
importador.ClienteFirebirdComercial();

Console.WriteLine("Importação finalizada.");
Console.ReadKey();`}</CodeBlock>
          </Section>

          <Section id="plus" icon={Database} title="5. Aba Plus - SQL Server">
            <p>
              Essa aba é para importações cujo destino é o banco <strong>Plus</strong>, usando SQL Server.
              Nos exemplos, o usuário padrão é <strong>sa</strong> e a senha é <strong>genesysjp</strong>.
            </p>

            <h3 className="text-lg font-bold text-slate-900">Pacotes NuGet - Plus SQL Server</h3>
            <CodeBlock>{`Install-Package Microsoft.EntityFrameworkCore -Version 8.0.8
Install-Package Microsoft.EntityFrameworkCore.Design -Version 8.0.8
Install-Package Microsoft.EntityFrameworkCore.Tools -Version 8.0.8
Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 8.0.8`}</CodeBlock>

            <h3 className="text-lg font-bold text-slate-900">Scaffold do destino Plus</h3>
            <CodeBlock>{`Scaffold-DbContext "Server=localhost\\SQLEXPRESS;Database=BancoPlusDestino;User Id=sa;Password=genesysjp;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Destino -Context DestinoContext -Force -NoOnConfiguring`}</CodeBlock>

            <h3 className="text-lg font-bold text-slate-900">Scaffold da origem SQL Server, quando existir banco origem</h3>
            <CodeBlock>{`Scaffold-DbContext "Server=localhost\\SQLEXPRESS;Database=BancoOrigem;User Id=sa;Password=genesysjp;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Origem -Context OrigemContext -Force -NoOnConfiguring`}</CodeBlock>

            <h3 className="text-lg font-bold text-slate-900">Program.cs - SQL Server para SQL Server</h3>
            <CodeBlock>{`using Microsoft.EntityFrameworkCore;
using NomeDoProjeto.Origem;
using NomeDoProjeto.Destino;

string connectionOrigem =
    @"Server=localhost\\SQLEXPRESS;Database=BancoOrigem;User Id=sa;Password=genesysjp;TrustServerCertificate=True;";

string connectionDestino =
    @"Server=localhost\\SQLEXPRESS;Database=BancoPlusDestino;User Id=sa;Password=genesysjp;TrustServerCertificate=True;";

var optionsOrigem = new DbContextOptionsBuilder<OrigemContext>()
    .UseSqlServer(connectionOrigem)
    .Options;

var optionsDestino = new DbContextOptionsBuilder<DestinoContext>()
    .UseSqlServer(connectionDestino)
    .Options;

using var origem = new OrigemContext(optionsOrigem);
using var destino = new DestinoContext(optionsDestino);

origem.ChangeTracker.AutoDetectChangesEnabled = false;
destino.ChangeTracker.AutoDetectChangesEnabled = false;

Console.WriteLine("Iniciando importação Plus...");

var importador = new Importador(origem, destino);
importador.ProdutoPlus();

Console.WriteLine("Importação Plus finalizada.");
Console.ReadKey();`}</CodeBlock>

            <h3 className="text-lg font-bold text-slate-900">Program.cs - CSV para Plus</h3>
            <CodeBlock>{`using Microsoft.EntityFrameworkCore;
using NomeDoProjeto.Destino;

string connectionDestino =
    @"Server=localhost\\SQLEXPRESS;Database=BancoPlusDestino;User Id=sa;Password=genesysjp;TrustServerCertificate=True;";

var optionsDestino = new DbContextOptionsBuilder<DestinoContext>()
    .UseSqlServer(connectionDestino)
    .Options;

using var destino = new DestinoContext(optionsDestino);

destino.ChangeTracker.AutoDetectChangesEnabled = false;

Console.WriteLine("Iniciando importação CSV para Plus...");

var importador = new Importador(destino);
importador.GradeProdutoPlusCsv();

Console.WriteLine("Importação finalizada.");
Console.ReadKey();`}</CodeBlock>
          </Section>

          <Section id="velo" icon={FileText} title="6. Aba Velo - reservado">
            <p>
              Aba reservada para documentação futura das importações para o Velo.
            </p>
            <CodeBlock>{`// TODO: Documentar padrão de importação Velo.
// Definir banco destino, provider, connection string, scaffold e exemplos reais.`}</CodeBlock>
          </Section>

          <Section id="avante" icon={FileText} title="7. Aba Avante - reservado">
            <p>
              Aba reservada para documentação futura das importações para o Avante.
            </p>
            <CodeBlock>{`// TODO: Documentar padrão de importação Avante.
// Por enquanto, manter vazio conforme definido.`}</CodeBlock>
          </Section>

          <Section id="csv-exemplos" icon={Terminal} title="8. Importador.cs - exemplos CSV">
            <p>
              Classe única <strong>Importador.cs</strong> com construtores para cenários com apenas destino ou com origem e destino.
            </p>
            <CodeBlock>{`using Microsoft.EntityFrameworkCore;
using NomeDoProjeto.Destino;

public class Importador
{
    private readonly DestinoContext _destino;
    private readonly Origem.OrigemContext? _origem;

    public Importador(DestinoContext destino)
    {
        _destino = destino;
    }

    public Importador(Origem.OrigemContext origem, DestinoContext destino)
    {
        _origem = origem;
        _destino = destino;
    }

    private static List<string[]> GetCSV(string caminho)
    {
        return File.ReadAllLines(caminho)
            .Skip(1)
            .Where(linha => !string.IsNullOrWhiteSpace(linha))
            .Select(linha => linha.Split(';'))
            .ToList();
    }

    public void GradeProduto()
    {
        List<string[]> grades = GetCSV(@"\\kailon\IMPORTACAO\Importações Victor\Mix More - sistema kigi\backup\produtosGrade.csv");
        var count = grades.Count;
        int contador = 0;

        Console.WriteLine($"Total de Grades encontrados: {count}");

        foreach (var grade in grades)
        {
            contador++;
            Console.WriteLine($"Grade {contador} // {count}");

            var antProdutoId = grade[0].ToString();
            var buscaProduto = _destino.Produtos
                .AsNoTracking()
                .FirstOrDefault(x => x.Alteracaousuario == antProdutoId);

            if (buscaProduto != null)
            {
                var novaGrade = new Grademovimento()
                {
                    AlteracaoData = DateTime.Now,
                    DataCadastro = DateTime.Now,
                    CadastroUsuario = "IMPORTAÇÃO",
                    AlteracaoUsuario = "IMPORTAÇÃO",
                    Tamanho = grade[8],
                    Referencia = grade[4],
                    ProdutoId = buscaProduto.ProdutoId,
                    IsAtivo = true,
                    Cor = grade[7],
                    Quantidade = Convert.ToDecimal(grade[11])
                };

                buscaProduto.Utilizagrade = true;

                _destino.Grademovimentos.Add(novaGrade);
            }

            if (contador % 500 == 0)
            {
                try
                {
                    _destino.SaveChanges();
                    _destino.ChangeTracker.Clear();
                    Console.WriteLine($"{contador} Grades importadas...");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message + "\n" + e.InnerException?.Message);
                }
            }
        }

        _destino.SaveChanges();
        _destino.ChangeTracker.Clear();

        Console.WriteLine("Importação de Grades finalizada.");
    }

    public void GradeProdutoPlusCsv()
    {
        List<string[]> grades = GetCSV(@"C:\\Importacao\\produtosGrade.csv");
        var count = grades.Count;
        int contador = 0;

        Console.WriteLine($"Total de Grades encontrados: {count}");

        foreach (var grade in grades)
        {
            contador++;
            Console.WriteLine($"Grade {contador} // {count}");

            var antProdutoId = grade[0].ToString();
            var buscaProduto = _destino.Produtos
                .AsNoTracking()
                .FirstOrDefault(x => x.Alteracaousuario == antProdutoId);

            if (buscaProduto != null)
            {
                var novaGrade = new Grademovimento()
                {
                    AlteracaoData = DateTime.Now,
                    DataCadastro = DateTime.Now,
                    CadastroUsuario = "IMPORTAÇÃO",
                    AlteracaoUsuario = "IMPORTAÇÃO",
                    Tamanho = grade[8],
                    Referencia = grade[4],
                    ProdutoId = buscaProduto.ProdutoId,
                    IsAtivo = true,
                    Cor = grade[7],
                    Quantidade = Convert.ToDecimal(grade[11])
                };

                _destino.Grademovimentos.Add(novaGrade);
            }

            if (contador % 500 == 0)
            {
                _destino.SaveChanges();
                _destino.ChangeTracker.Clear();
                Console.WriteLine($"{contador} Grades importadas...");
            }
        }

        _destino.SaveChanges();
        _destino.ChangeTracker.Clear();

        Console.WriteLine("Importação de Grades para Plus finalizada.");
    }
}`}</CodeBlock>
          </Section>

          <Section id="firebird-exemplos" icon={Wrench} title="9. Importador.cs - exemplos Firebird">
            <p>
              Exemplo mantendo o padrão de leitura por <strong>BancoOrigem.Execute()</strong>. A configuração da conexão Firebird fica fora desta documentação.
            </p>
            <CodeBlock>{`using System.Data;
using NomeDoProjeto.Destino;

public partial class Importador
{
    public void ClienteFirebirdComercial()
    {
        var clientes = BancoOrigem.Execute(Select.GetAllFromTable("TCLIENTE"));
        int i = 1;
        int count = clientes.Rows.Count;

        foreach (DataRow row in clientes.Rows)
        {
            Console.WriteLine($"Cliente {i++}/{count}");

            var novoCli = new Pessoa()
            {
                Alteracaodata = DateTime.Now,
                Datacadastro = DateTime.Now,
                Cadastrocompleto = true,
                Cadastrousuario = "IMPORTAÇÃO",
                Alteracaousuario = row["CONTROLE"].ToString(),
                Ativo = row["ATIVO"].ToString() == "SIM" ? true : false,
                Fisjur = row["TIPOCLIENTE"].ToString() == "FÍSICA" ? "F" : "J",
                Iscliente = true,
                Consumidorfinal = 1,
                Nomerazaosocial = row["CLIENTE"].ToString(),
                Nomefantasia = row["FANTASIA"].ToString(),
                Bairro = row["BAIRRO"].ToString(),
                Logradouro = row["ENDERECO"].ToString(),
                Municipio = row["CODIGOCIDADEIBGE"].ToString(),
                Uf = Convert.ToInt32(row["CODIGOCIDADEIBGE"].ToString().Substring(0, 2)),
                Cep = row["CEP"] != DBNull.Value ? FormatarDocumento(row["CEP"].ToString()) : "",
                Cpfcnpj = row["CPF"] != DBNull.Value ? FormatarDocumento(row["CPF"].ToString())
                    : row["CNPJ"] != DBNull.Value ? FormatarDocumento(row["CNPJ"].ToString()) : "",
                Rgie = row["RG"] != DBNull.Value ? FormatarDocumento(row["RG"].ToString())
                    : row["IE"] != DBNull.Value ? FormatarDocumento(row["IE"].ToString()) : "",
                Observacao = row["OBS"].ToString(),
                Celular = row["CELULAR"] != DBNull.Value ? FormatarDocumento(row["CELULAR"].ToString()) : "",
            };

            _destino.Pessoas.Add(novoCli);
            _destino.SaveChanges();
        }
    }

    public void ClienteFirebirdPlus()
    {
        var clientes = BancoOrigem.Execute(Select.GetAllFromTable("TCLIENTE"));
        int i = 1;
        int count = clientes.Rows.Count;

        foreach (DataRow row in clientes.Rows)
        {
            Console.WriteLine($"Cliente {i++}/{count}");

            var novoCli = new Pessoa()
            {
                Alteracaodata = DateTime.Now,
                Datacadastro = DateTime.Now,
                Cadastrocompleto = true,
                Cadastrousuario = "IMPORTAÇÃO",
                Alteracaousuario = row["CONTROLE"].ToString(),
                Ativo = row["ATIVO"].ToString() == "SIM" ? true : false,
                Fisjur = row["TIPOCLIENTE"].ToString() == "FÍSICA" ? "F" : "J",
                Iscliente = true,
                Consumidorfinal = 1,
                Nomerazaosocial = row["CLIENTE"].ToString(),
                Nomefantasia = row["FANTASIA"].ToString(),
                Bairro = row["BAIRRO"].ToString(),
                Logradouro = row["ENDERECO"].ToString(),
                Municipio = row["CODIGOCIDADEIBGE"].ToString(),
                Uf = Convert.ToInt32(row["CODIGOCIDADEIBGE"].ToString().Substring(0, 2)),
                Cep = row["CEP"] != DBNull.Value ? FormatarDocumento(row["CEP"].ToString()) : "",
                Cpfcnpj = row["CPF"] != DBNull.Value ? FormatarDocumento(row["CPF"].ToString())
                    : row["CNPJ"] != DBNull.Value ? FormatarDocumento(row["CNPJ"].ToString()) : "",
                Rgie = row["RG"] != DBNull.Value ? FormatarDocumento(row["RG"].ToString())
                    : row["IE"] != DBNull.Value ? FormatarDocumento(row["IE"].ToString()) : "",
                Observacao = row["OBS"].ToString(),
                Celular = row["CELULAR"] != DBNull.Value ? FormatarDocumento(row["CELULAR"].ToString()) : "",
            };

            _destino.Pessoas.Add(novoCli);
            _destino.SaveChanges();
        }
    }
}`}</CodeBlock>
          </Section>

          <Section id="boas-praticas" icon={CheckCircle2} title="10. Boas práticas para importações">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Use uma única classe Importador.cs com métodos por entidade.",
                "Crie os contextos no Program.cs e passe para o Importador pelo construtor.",
                "Quando a origem for CSV, passe somente o contexto do destino.",
                "Quando a origem for banco, crie as pastas Origem e Destino com Scaffold separado.",
                "Use AsNoTracking() em consultas de leitura.",
                "Use SaveChanges em lote, por exemplo a cada 500 registros.",
                "Use ChangeTracker.Clear() após salvar cada lote.",
                "Não edite manualmente as classes geradas pelo Scaffold."
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} />
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <p>Exemplo de carregamento rápido em memória para evitar consulta dentro do foreach:</p>
            <CodeBlock>{`var produtos = _destino.Produtos
    .AsNoTracking()
    .Where(p => p.Alteracaousuario != null)
    .ToList()
    .GroupBy(p => p.Alteracaousuario)
    .ToDictionary(g => g.Key, g => g.First());

produtos.TryGetValue(codigoProdutoOrigem, out var produto);`}</CodeBlock>
          </Section>
        </div>
      </main>
    </div>
  );
}
