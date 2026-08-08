import { Plus, Minus } from 'lucide-react'
import ExpandPanel from '@/components/ExpandPanel'

interface FaqItemProps {
  id: string
  question: string
  answer: string
}

export default function FaqItem({ id, question, answer }: FaqItemProps) {
  return (
    <div className="border-b border-white/20 py-1">
      <ExpandPanel
        id={id}
        triggerClassName="w-full flex items-center justify-between gap-4 py-4 text-left text-paper text-base hover:text-accent-text transition-colors duration-150"
        panelClassName="overflow-hidden"
        collapsedTrigger={
          <>
            <span>{question}</span>
            <Plus size={16} className="shrink-0" aria-hidden="true" />
          </>
        }
        expandedTrigger={
          <>
            <span>{question}</span>
            <Minus size={16} className="shrink-0" aria-hidden="true" />
          </>
        }
      >
        <p className="text-paper/60 text-base leading-relaxed pb-5 pr-8">
          {answer}
        </p>
      </ExpandPanel>
    </div>
  )
}
