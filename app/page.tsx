'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  Plus, DollarSign, TrendingUp, TrendingDown, Calendar, Info, Trash2, X,
  Wallet, CreditCard, User, CheckCircle2, Shield, Landmark, Building, Coins, Target, Award, PiggyBank, Loader2, AlertTriangle
} from 'lucide-react';

// ==========================================
// INTERFACES TYPESCRIPT (Correção do Erro)
// ==========================================
interface Transaction {
  id: string;
  desc: string;
  amount: number;
}

interface FinancialItem {
  id: string;
  period: string;
  group: string;
  name: string;
  forecast: number;
  transactions: Transaction[];
}

interface TxInput {
  desc?: string;
  amount?: string;
}

// URL DO SEU BACK-END (Usando o DuckDNS)
const API_URL = 'https://financeappmg.duckdns.org/finance';

// ==========================================
// MOCK DATA (USADO COMO FALLBACK CASO A API FALHE)
// ==========================================
const generateMockExpenses = (): FinancialItem[] => {
  const baseData = [
    { group: 'GASTOS (pix)', name: 'Aluguel', forecast: 1000, baseActual: 1000, desc: 'Mensalidade' },
    { group: 'GASTOS (pix)', name: 'Água', forecast: 60, baseActual: 65, desc: 'Conta do mês' },
    { group: 'GASTOS (pix)', name: 'Energia', forecast: 60, baseActual: 55, desc: 'Conta do mês' },
    { group: 'GASTOS (pix)', name: 'Internet', forecast: 100, baseActual: 100, desc: 'Fatura' },
    { group: 'GASTOS (pix)', name: 'Transporte', forecast: 150, baseActual: 160, desc: 'Uber e recargas' },
    { group: 'GASTOS (pix)', name: 'Terreno', forecast: 385.05, baseActual: 385.05, desc: 'Parcela' },
    { group: 'GASTOS (cartão)', name: 'Farmácia', forecast: 100, baseActual: 80, desc: 'Remédios' },
    { group: 'GASTOS (cartão)', name: 'Mercado', forecast: 550, baseActual: 620, desc: 'Compras do mês' },
    { group: 'GASTOS (cartão)', name: 'Passagem', forecast: 200, baseActual: 200, desc: 'Passagens' },
    { group: 'GASTOS (cartão)', name: 'Streaming', forecast: 56.13, baseActual: 56.13, desc: 'Meli+, Spotify' },
    { group: 'GASTOS (cartão)', name: 'Móveis', forecast: 173, baseActual: 173, desc: 'Parcela móveis' },
    { group: 'GASTOS (cartão)', name: 'Crédito Celular', forecast: 60, baseActual: 60, desc: 'Recarga' },
    { group: 'GABI', name: 'Cartão', forecast: 435.46, baseActual: 435.46, desc: 'Fatura Nubank' },
    { group: 'GABI', name: 'Gympass', forecast: 55, baseActual: 55, desc: 'Mensalidade' },
    { group: 'GABI', name: 'Internet', forecast: 50, baseActual: 50, desc: 'Plano móvel' },
    { group: 'GABI', name: 'Estratégia', forecast: 47.60, baseActual: 47.60, desc: 'Assinatura' },
    { group: 'GABI', name: 'Extra', forecast: 100, baseActual: 40, desc: 'Roupa nova' },
    { group: 'MARCELO', name: 'Cartão', forecast: 316, baseActual: 316, desc: 'Fatura Inter' },
    { group: 'MARCELO', name: 'Faculdade', forecast: 115, baseActual: 115, desc: 'Mensalidade' },
    { group: 'MARCELO', name: 'Ração', forecast: 115, baseActual: 120, desc: 'Saco grande' },
    { group: 'MARCELO', name: 'Academia', forecast: 0, baseActual: 0, desc: '' },
    { group: 'MARCELO', name: 'Extra', forecast: 100, baseActual: 80, desc: 'Lanche' },
  ];

  // AQUI FOI APLICADA A CORREÇÃO
  let data: FinancialItem[] = [];
  let idCounter = 1;
  let txIdCounter = 1;
  const periods = ['2026-01', '2026-02', '2026-03'];

  periods.forEach((period, index) => {
    baseData.forEach(item => {
      const variation = index === 2 ? 1 : (Math.random() * (1.2 - 0.8) + 0.8);
      const amountVal = Number((item.baseActual * variation).toFixed(2));
      data.push({
        id: (idCounter++).toString(), period, group: item.group, name: item.name, forecast: item.forecast,
        transactions: amountVal > 0 ? [{ id: (txIdCounter++).toString(), desc: item.desc || 'Lançamento', amount: amountVal }] : []
      });
    });
  });
  return data;
};

const generateMockInvestments = (): FinancialItem[] => {
  const baseData = [
    { group: 'RESERVA', name: 'CDB Liquidez', forecast: 300, baseActual: 300, desc: 'Aporte Mensal' },
    { group: 'RENDA FIXA', name: 'Tesouro IPCA+', forecast: 400, baseActual: 500, desc: 'Aproveitei a taxa' },
    { group: 'RENDA VARIÁVEL', name: 'MXRF11 (FII)', forecast: 150, baseActual: 150, desc: 'Reinvestimento' },
    { group: 'CRIPTOMOEDAS', name: 'Bitcoin', forecast: 100, baseActual: 100, desc: 'DCA' },
  ];

  // AQUI FOI APLICADA A CORREÇÃO
  let data: FinancialItem[] = [];
  let idCounter = 1000;
  let txIdCounter = 1000;
  const periods = ['2026-01', '2026-02', '2026-03'];

  periods.forEach((period, index) => {
    baseData.forEach(item => {
      const variation = index === 2 ? 1 : (Math.random() * (1.3 - 0.7) + 0.7);
      const amountVal = Number((item.baseActual * variation).toFixed(2));
      data.push({
        id: (idCounter++).toString(), period, group: item.group, name: item.name, forecast: item.forecast,
        transactions: amountVal > 0 ? [{ id: (txIdCounter++).toString(), desc: item.desc || 'Aporte', amount: amountVal }] : []
      });
    });
  });
  return data;
};

// Função auxiliar tipada
const getActualTotal = (transactions?: Transaction[]): number => {
  if (!transactions) return 0;
  return transactions.reduce((sum, t) => sum + Number(t.amount), 0);
};

// --- CONFIGURAÇÕES DOS GRUPOS ---
const EXPENSE_GROUPS = ['GASTOS (pix)', 'GASTOS (cartão)', 'GABI', 'MARCELO'];
const EXPENSE_CONFIG: Record<string, any> = {
  'GASTOS (pix)': { icon: Wallet, bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500', hex: '#f59e0b' },
  'GASTOS (cartão)': { icon: CreditCard, bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500', hex: '#10b981' },
  'GABI': { icon: User, bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', border: 'border-fuchsia-200', dot: 'bg-fuchsia-500', hex: '#d946ef' },
  'MARCELO': { icon: User, bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-200', dot: 'bg-sky-500', hex: '#0ea5e9' },
};

const INVESTMENT_GROUPS = ['RESERVA', 'RENDA FIXA', 'RENDA VARIÁVEL', 'CRIPTOMOEDAS'];
const INVESTMENT_CONFIG: Record<string, any> = {
  'RESERVA': { icon: Shield, bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', dot: 'bg-blue-500', hex: '#3b82f6' },
  'RENDA FIXA': { icon: Landmark, bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200', dot: 'bg-teal-500', hex: '#14b8a6' },
  'RENDA VARIÁVEL': { icon: Building, bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200', dot: 'bg-indigo-500', hex: '#6366f1' },
  'CRIPTOMOEDAS': { icon: Coins, bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', dot: 'bg-orange-500', hex: '#f97316' },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'gastos' | 'investimentos'>('gastos');

  // Tipagem adicionada ao state principal
  const [dataList, setDataList] = useState<FinancialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const [currentPeriod, setCurrentPeriod] = useState('2026-03');
  const [availablePeriods] = useState(['2026-01', '2026-02', '2026-03', '2026-04']);

  const [newItem, setNewItem] = useState({ group: '', name: '', forecast: '' });

  // Tipagem adicionada ao state de inputs
  const [txInputs, setTxInputs] = useState<Record<string, TxInput>>({});

  const isExpense = activeTab === 'gastos';
  const currentGroups = isExpense ? EXPENSE_GROUPS : INVESTMENT_GROUPS;
  const currentConfig = isExpense ? EXPENSE_CONFIG : INVESTMENT_CONFIG;

  useEffect(() => {
    setNewItem({
      group: activeTab === 'gastos' ? EXPENSE_GROUPS[0] : INVESTMENT_GROUPS[0],
      name: '',
      forecast: ''
    });
  }, [activeTab]);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}?type=${activeTab}&period=${currentPeriod}`, {
          signal: controller.signal
        });

        if (!response.ok) throw new Error('Erro ao buscar dados');

        const data = await response.json();
        setDataList(data);
        setIsOfflineMode(false);

      } catch (error: any) {
        console.error("Erro na API:", error);

        setIsOfflineMode(true);
        setDataList(
          activeTab === 'gastos'
            ? generateMockExpenses()
            : generateMockInvestments()
        );

      } finally {
        setIsLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchData();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [activeTab, currentPeriod]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.forecast) return;

    if (isOfflineMode) {
      const newEntry: FinancialItem = {
        id: Date.now().toString(),
        period: currentPeriod,
        group: newItem.group,
        name: newItem.name,
        forecast: Number(newItem.forecast),
        transactions: []
      };
      setDataList(prev => [...prev, newEntry]);
      setNewItem({ group: currentGroups[0], name: '', forecast: '' });
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTab,
          period: currentPeriod,
          group: newItem.group,
          name: newItem.name,
          forecast: Number(newItem.forecast)
        })
      });
      if (!response.ok) throw new Error('Erro ao salvar');
      const createdItem = await response.json();
      setDataList(prev => [...prev, createdItem]);
      setNewItem({ group: currentGroups[0], name: '', forecast: '' });
    } catch (error) {
      console.error("Erro ao criar item:", error);
      alert("Falha ao salvar no servidor.");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!window.confirm("Deseja realmente excluir este tópico e todos os seus lançamentos?")) return;

    if (isOfflineMode) {
      setDataList(prev => prev.filter(item => item.id !== itemId));
      return;
    }

    try {
      await fetch(`${API_URL}/${itemId}`, { method: 'DELETE' });
      setDataList(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  const handleTxInputChange = (itemId: string, field: 'desc' | 'amount', value: string) => {
    setTxInputs(prev => ({ ...prev, [itemId]: { ...prev[itemId], [field]: value } }));
  };

  const handleAddTransaction = async (itemId: string) => {
    const input = txInputs[itemId];
    if (!input || !input.desc || !input.amount) return;

    if (isOfflineMode) {
      const newTx: Transaction = { id: Date.now().toString(), desc: input.desc, amount: Number(input.amount) };
      setDataList(prev => prev.map(item => item.id === itemId ? { ...item, transactions: [...item.transactions, newTx] } : item));
      setTxInputs(prev => ({ ...prev, [itemId]: { desc: '', amount: '' } }));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${itemId}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ desc: input.desc, amount: Number(input.amount) })
      });
      if (!response.ok) throw new Error('Erro ao salvar transação');
      const newTx = await response.json();
      setDataList(prev => prev.map(item => item.id === itemId ? { ...item, transactions: [...item.transactions, newTx] } : item));
      setTxInputs(prev => ({ ...prev, [itemId]: { desc: '', amount: '' } }));
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };

  const handleRemoveTransaction = async (itemId: string, txId: string) => {
    if (isOfflineMode) {
      setDataList(prev => prev.map(item => item.id === itemId ? { ...item, transactions: item.transactions.filter(t => t.id !== txId) } : item));
      return;
    }

    try {
      await fetch(`${API_URL}/transactions/${txId}`, { method: 'DELETE' });
      setDataList(prev => prev.map(item => item.id === itemId ? { ...item, transactions: item.transactions.filter(t => t.id !== txId) } : item));
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  const labelPrevisto = isExpense ? 'Previsto' : 'Meta';
  const labelRealizado = isExpense ? 'Realizado' : 'Aportado';

  const currentPeriodData = useMemo(() => dataList.filter(d => d.period === currentPeriod), [dataList, currentPeriod]);

  const totals = useMemo(() => {
    return currentPeriodData.reduce((acc, curr) => ({
      forecast: acc.forecast + Number(curr.forecast),
      actual: acc.actual + getActualTotal(curr.transactions),
    }), { forecast: 0, actual: 0 });
  }, [currentPeriodData]);

  const groupTotals = useMemo(() => {
    return currentGroups.reduce((acc: Record<string, { forecast: number, actual: number }>, group) => {
      const items = currentPeriodData.filter(d => d.group === group);
      acc[group] = items.reduce((sum, item) => ({
        forecast: sum.forecast + Number(item.forecast),
        actual: sum.actual + getActualTotal(item.transactions)
      }), { forecast: 0, actual: 0 });
      return acc;
    }, {});
  }, [currentPeriodData, currentGroups]);

  const chartDataMonthly = useMemo(() => {
    return availablePeriods.map(period => {
      const periodData = dataList.filter(d => d.period === period);
      return {
        name: period.split('-').reverse().join('/'),
        [labelPrevisto]: periodData.reduce((sum, item) => sum + Number(item.forecast), 0),
        [labelRealizado]: periodData.reduce((sum, item) => sum + getActualTotal(item.transactions), 0),
      };
    });
  }, [dataList, availablePeriods, labelPrevisto, labelRealizado]);

  const pieData = useMemo(() => {
    return Object.keys(groupTotals).map(key => ({
      name: key,
      value: groupTotals[key].actual
    })).filter(item => item.value > 0);
  }, [groupTotals]);

  const isGoodPerformance = isExpense ? totals.forecast >= totals.actual : totals.actual >= totals.forecast;

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">

      {/* MENU LATERAL (SIDEBAR) - DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
            <DollarSign size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-wide text-white">Finanças</h1>
            <p className="text-indigo-300 text-xs font-medium uppercase tracking-widest">
              {isOfflineMode ? 'Modo Offline' : 'DuckDNS Ativo'}
            </p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab('gastos')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isExpense ? 'bg-indigo-600 text-white shadow-[0_4px_20px_rgb(79,70,229,0.4)]' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Wallet size={20} /> <span className="font-bold tracking-wide">Despesas Mensais</span>
          </button>
          <button
            onClick={() => setActiveTab('investimentos')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${!isExpense ? 'bg-indigo-600 text-white shadow-[0_4px_20px_rgb(79,70,229,0.4)]' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <TrendingUp size={20} /> <span className="font-bold tracking-wide">Investimentos</span>
          </button>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL (SCROLLABLE) */}
      <main className="flex-1 overflow-y-auto md:ml-64 w-full h-full pb-24 md:pb-8 relative">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">

          {/* HEADER RESPONSIVO COM AVISO DE OFFLINE */}
          <header className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
            <div className="text-center sm:text-left flex items-center gap-3 w-full">
              {isLoading && <Loader2 className="animate-spin text-indigo-500 shrink-0" size={24} />}
              {!isLoading && isOfflineMode && <AlertTriangle className="text-amber-500 shrink-0" size={28} />}
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  {isExpense ? 'Controle de Gastos' : 'Carteira de Investimentos'}
                </h2>
                {isOfflineMode ? (
                  <p className="text-amber-600 text-sm font-semibold mt-1 bg-amber-50 inline-block px-2 py-0.5 rounded-md">
                    Modo Offline. A API não respondeu. Exibindo dados de teste.
                  </p>
                ) : (
                  <p className="text-slate-500 text-sm font-medium mt-1">
                    Sincronizado via API.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 sm:mt-0 flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-shadow shrink-0">
              <Calendar className="text-indigo-500" size={20} />
              <select
                value={currentPeriod}
                onChange={(e) => setCurrentPeriod(e.target.value)}
                className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
              >
                {availablePeriods.map(p => (
                  <option key={p} value={p}>{p.split('-').reverse().join('/')}</option>
                ))}
              </select>
            </div>
          </header>

          {/* CARDS DE RESUMO GERAL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="p-4 bg-slate-100 rounded-2xl text-slate-600">
                {isExpense ? <CheckCircle2 size={28} /> : <Target size={28} />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isExpense ? 'Total Previsto' : 'Meta de Aporte'}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-1">{formatCurrency(totals.forecast)}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                {isExpense ? <Wallet size={28} /> : <PiggyBank size={28} />}
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{isExpense ? 'Total Realizado' : 'Total Aportado'}</p>
                <h3 className="text-2xl font-black text-indigo-950 mt-1">{formatCurrency(totals.actual)}</h3>
              </div>
            </div>

            <div className={`p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300 ${isGoodPerformance ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-100' : 'bg-gradient-to-br from-rose-50 to-white border-rose-100'
              }`}>
              <div className={`p-4 rounded-2xl ${isGoodPerformance ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {isGoodPerformance ? <Award size={28} strokeWidth={2.5} /> : <TrendingDown size={28} strokeWidth={2.5} />}
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${isGoodPerformance ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {isExpense
                    ? (totals.forecast >= totals.actual ? 'Sobrou no Mês' : 'Passou do Limite')
                    : (totals.actual >= totals.forecast ? 'Meta Superada' : 'Abaixo da Meta')
                  }
                </p>
                <h3 className={`text-2xl font-black mt-1 ${isGoodPerformance ? 'text-emerald-900' : 'text-rose-900'}`}>
                  {formatCurrency(Math.abs(totals.forecast - totals.actual))}
                </h3>
              </div>
            </div>
          </div>

          {/* GRÁFICOS LADO A LADO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 w-full">
            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 w-full">
              <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                {isExpense ? 'Distribuição de Gastos' : 'Composição da Carteira'}
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData} cx="50%" cy="50%"
                      innerRadius={75} outerRadius={105}
                      paddingAngle={5} dataKey="value" nameKey="name"
                      stroke="none" cornerRadius={6}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={currentConfig[entry.name]?.hex || '#000'} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any) => formatCurrency(Number(value))}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgb(0 0 0 / 0.15)', fontWeight: 'bold' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 w-full">
              <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                {isExpense ? 'Evolução dos Gastos' : 'Evolução dos Aportes'}
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartDataMonthly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} tickFormatter={(val) => `R$${val / 1000}k`} width={65} />
                    <Tooltip
                      formatter={(value: any) => formatCurrency(Number(value))}
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgb(0 0 0 / 0.15)', fontWeight: 'bold' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '600', color: '#64748b', paddingTop: '20px' }} />
                    <Bar dataKey={labelPrevisto} fill="#cbd5e1" radius={[6, 6, 0, 0]} maxBarSize={40} />
                    <Bar dataKey={labelRealizado} fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* TABELAS 2x2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 w-full">
            {currentGroups.map(groupName => {
              const groupItems = currentPeriodData.filter(d => d.group === groupName);
              if (groupItems.length === 0) return null;

              const config = currentConfig[groupName];
              const GroupIcon = config.icon;

              return (
                <div key={groupName} className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 overflow-hidden w-full flex flex-col">
                  <div className={`${config.bg} px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b ${config.border}`}>
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 bg-white/60 rounded-lg ${config.text}`}><GroupIcon size={18} /></div>
                      <h2 className={`font-bold text-[13px] uppercase tracking-wide ${config.text}`}>{groupName}</h2>
                    </div>
                    <div className="bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm w-fit border border-white/40">
                      <span className={`text-xs font-bold ${config.text}`}>
                        {labelRealizado}: {formatCurrency(groupTotals[groupName].actual)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col w-full flex-1 min-w-0">
                    <div className="hidden xl:grid xl:grid-cols-12 gap-2 px-4 py-2 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <div className="col-span-3">Tópico / Ativo</div>
                      
                    </div>

                    <div className="divide-y divide-slate-100/80">
                      {groupItems.map(item => {
                        const actualTotal = getActualTotal(item.transactions);
                        const diff = isExpense ? item.forecast - actualTotal : actualTotal - item.forecast;

                        return (
                          <div key={item.id} className="flex flex-col gap-3 px-4 py-4 hover:bg-slate-50/50 transition-colors w-full min-w-0 border-b border-slate-100 last:border-0">

                            {/* 1. Nome do Tópico e Botão Excluir */}
                            <div className="flex items-center gap-2 w-full">
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-slate-300 hover:text-rose-500 transition-colors p-1 hover:bg-rose-50 rounded-md shrink-0"
                              >
                                <Trash2 size={16} />
                              </button>
                              <span className="font-bold text-slate-700 text-[15px] truncate">{item.name}</span>
                            </div>

                            {/* 2. Área de Valores (Background cinza estilizado) */}
                            <div className="grid grid-cols-3 gap-2 w-full bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                              {/* Previsto */}
                              <div className="flex flex-col min-w-0">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Previsto</span>
                                <span className="text-slate-500 font-medium text-xs truncate">{formatCurrency(item.forecast)}</span>
                              </div>

                              {/* Realizado */}
                              <div className="flex flex-col border-l border-slate-200 pl-3 min-w-0">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Realizado</span>
                                <span className="text-slate-900 font-black text-xs truncate">{formatCurrency(actualTotal)}</span>
                              </div>

                              {/* Diferença */}
                              <div className="flex flex-col border-l border-slate-200 pl-3 min-w-0">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Dif.</span>
                                <span className={`font-bold text-xs truncate ${diff > 0 ? 'text-emerald-500' : diff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                                  {diff !== 0 ? (diff > 0 ? '+' : '') + formatCurrency(diff) : '-'}
                                </span>
                              </div>
                            </div>

                            {/* 3. Lista de Lançamentos (se houver) */}
                            {item.transactions && item.transactions.length > 0 && (
                              <div className="flex flex-col gap-1.5 w-full">
                                {item.transactions.map(t => (
                                  <div key={t.id} className="flex justify-between items-center text-[11px] bg-white border border-slate-200/60 px-3 py-2 rounded-lg shadow-sm group">
                                    <div className="flex items-center gap-2 overflow-hidden flex-1">
                                      <div className={`w-1.5 h-1.5 rounded-full ${config.dot} shrink-0`}></div>
                                      <span className="truncate text-slate-600 font-medium" title={t.desc}>{t.desc}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="font-bold text-slate-800">{formatCurrency(t.amount)}</span>
                                      <button
                                        onClick={() => handleRemoveTransaction(item.id, t.id)}
                                        className="text-slate-300 hover:text-rose-500 transition-all p-0.5"
                                      >
                                        <X size={12} strokeWidth={3} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* 4. Input de Novo Lançamento */}
                            <div className="w-full">
                              <div className="flex items-center bg-white border border-slate-200/80 p-1 rounded-xl focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-50 transition-all shadow-sm">
                                <input
                                  type="text"
                                  placeholder={isExpense ? "Detalhes..." : "Aporte..."}
                                  value={txInputs[item.id]?.desc || ''}
                                  onChange={(e) => handleTxInputChange(item.id, 'desc', e.target.value)}
                                  className="flex-1 min-w-0 text-[13px] p-2 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                                  onKeyPress={(e) => e.key === 'Enter' && handleAddTransaction(item.id)}
                                />
                                <div className="w-px h-5 bg-slate-200 mx-1 shrink-0"></div>
                                <input
                                  type="number"
                                  step="0.01"
                                  placeholder="R$"
                                  value={txInputs[item.id]?.amount || ''}
                                  onChange={(e) => handleTxInputChange(item.id, 'amount', e.target.value)}
                                  className="w-16 shrink-0 text-[13px] p-2 bg-transparent outline-none text-slate-500 placeholder:text-slate-300 font-bold text-right appearance-none"
                                  onKeyPress={(e) => e.key === 'Enter' && handleAddTransaction(item.id)}
                                />
                                <button
                                  onClick={() => handleAddTransaction(item.id)}
                                  className="bg-indigo-600 text-white p-2 rounded-lg ml-1 hover:bg-indigo-700 transition-all shrink-0"
                                >
                                  <Plus size={18} strokeWidth={3} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RODAPÉ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full pb-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleAddItem} className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 flex flex-col md:flex-row gap-4 items-end w-full h-full">
                <div className="w-full md:w-1/4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Grupo</label>
                  <select
                    value={newItem.group}
                    onChange={e => setNewItem({ ...newItem, group: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 font-medium text-slate-700 transition-all"
                  >
                    {currentGroups.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Novo Tópico / Ativo</label>
                  <input
                    type="text" required
                    value={newItem.name}
                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 font-medium text-slate-700 transition-all placeholder:text-slate-400"
                    placeholder={isExpense ? "Ex: Lazer" : "Ex: XPML11"}
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{labelPrevisto} (R$)</label>
                  <input
                    type="number" step="0.01" required
                    value={newItem.forecast}
                    onChange={e => setNewItem({ ...newItem, forecast: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 font-medium text-slate-700 transition-all placeholder:text-slate-400"
                    placeholder="0.00"
                  />
                </div>
                <button type="submit" disabled={isLoading && !isOfflineMode} className="w-full md:w-auto bg-slate-900 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 px-6 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors shadow-lg shadow-slate-200">
                  <Plus size={18} strokeWidth={3} /> Criar
                </button>
              </form>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100/60 flex gap-4 text-sm text-indigo-900 shadow-sm h-full items-center">
                <Info className="shrink-0 text-indigo-500" size={28} />
                <p className="font-medium leading-relaxed">
                  {isOfflineMode
                    ? "Você está no modo offline de demonstração, as alterações são salvas apenas na tela."
                    : "Conectado à API em financeappmg.duckdns.org. Qualquer alteração feita aqui será salva no banco de dados."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MENU INFERIOR (MOBILE) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200 flex justify-around p-2 pb-safe z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setActiveTab('gastos')}
          className={`flex flex-col items-center gap-1.5 p-2 px-6 rounded-xl transition-all ${isExpense ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'}`}
        >
          <Wallet size={24} strokeWidth={isExpense ? 2.5 : 2} />
          <span className={`text-[10px] uppercase tracking-wider ${isExpense ? 'font-bold' : 'font-medium'}`}>Gastos</span>
        </button>
        <button
          onClick={() => setActiveTab('investimentos')}
          className={`flex flex-col items-center gap-1.5 p-2 px-6 rounded-xl transition-all ${!isExpense ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'}`}
        >
          <TrendingUp size={24} strokeWidth={!isExpense ? 2.5 : 2} />
          <span className={`text-[10px] uppercase tracking-wider ${!isExpense ? 'font-bold' : 'font-medium'}`}>Carteira</span>
        </button>
      </nav>
    </div>
  );
}