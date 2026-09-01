import React, { useState } from 'react'
import { MOCK_REPORTS } from '../../data/analyticsData'
import { ReportItem } from '../../types/maritime'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { Modal } from '../common/Modal'
import { exportReportsCsv, exportFleetCsv } from '../../utils/exportUtils'
import { FileText, Download, Eye, PlusCircle, CheckCircle2, ShieldCheck } from 'lucide-react'

export const ReportsView: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null)
  const [reportsList, setReportsList] = useState<ReportItem[]>(MOCK_REPORTS)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const newReport: ReportItem = {
        id: `REP-2026-080${reportsList.length + 1}`,
        title: `Real-time Fleet CII Audit & Route Performance (${new Date().toLocaleDateString()})`,
        type: 'Voyage',
        date: new Date().toISOString().split('T')[0],
        generatedBy: 'Torque IQ AI Engine',
        status: 'Ready',
        summary: 'Generated on-demand audit certifying 12.4% fuel savings and 1,345t CO₂ emissions for active Mumbai → Singapore corridor.'
      }
      setReportsList([newReport, ...reportsList])
      setIsGenerating(false)
    }, 800)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-850 border border-navy-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Audit & Compliance System</span>
          </div>
          <h2 className="text-2xl font-black text-white">Voyage & Carbon Audit Reports</h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate, inspect, and export verified maritime fuel, CII carbon emissions, and fleet efficiency reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportReportsCsv}
            className="px-4 py-2.5 rounded-xl bg-navy-800 text-slate-200 border border-navy-700 hover:border-cyan-500/40 text-xs font-bold transition flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-navy-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition flex items-center gap-2 disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4 fill-navy-950 text-cyan-400" />
            <span>{isGenerating ? 'Generating...' : 'Generate New Report'}</span>
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportsList.map((rep) => (
          <Card key={rep.id} className="hover:border-cyan-500/40 transition">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">{rep.id}</span>
                  <Badge variant={rep.type === 'Voyage' ? 'green' : rep.type === 'Carbon' ? 'cyan' : 'yellow'} size="sm" className="ml-2">
                    {rep.type} Report
                  </Badge>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">{rep.date}</span>
            </div>

            <h4 className="text-base font-extrabold text-white mb-2">{rep.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{rep.summary}</p>

            <div className="pt-3 border-t border-navy-700/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Authored by: <span className="text-slate-200 font-semibold">{rep.generatedBy}</span></span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReport(rep)}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 text-cyan-400 hover:bg-cyan-500 hover:text-navy-950 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Report</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View Report Detail Modal */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={`Report Inspector — ${selectedReport.id}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-navy-900 border border-navy-700/80">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="green" size="md">{selectedReport.type} Audit Report</Badge>
                <span className="text-xs font-mono text-slate-400">{selectedReport.date}</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">{selectedReport.title}</h3>
              <p className="text-xs text-slate-400 mt-1">Generated by: {selectedReport.generatedBy}</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-3 text-xs text-slate-300">
              <h4 className="font-bold text-white uppercase tracking-wider">Audit Executive Summary</h4>
              <p className="leading-relaxed">{selectedReport.summary}</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified by GreenRoute AI Audit System</span>
              </div>
              <button
                onClick={exportReportsCsv}
                className="px-3 py-1.5 rounded-lg bg-emerald-400 text-navy-950 font-bold text-xs hover:bg-emerald-300 transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CSV Audit</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
