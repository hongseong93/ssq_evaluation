export type Division = "template" | "original";
export type AssignmentStatus = "not_started" | "draft" | "completed" | "submitted";

export type Submission = {
  id: string;
  receiptNumber: string;
  division: Division;
  artistName: string;
  artworkTitle: string;
  videoTitle: string;
  concept: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
};

export type Judge = {
  id: string;
  name: string;
  email: string;
  organization: string;
  position: string;
  phone: string;
  division: Division | "all";
  isActive: boolean;
  lastSeen: string;
};

export type Criterion = {
  id: string;
  division: Division;
  title: string;
  maxScore: number;
  description: string;
  questions: string[];
  order: number;
};

export type Assignment = {
  judgeId: string;
  submissionId: string;
  status: AssignmentStatus;
  updatedAt: string;
};

export type ScoreEntry = {
  judgeId: string;
  submissionId: string;
  criterionId: string;
  questionScores: number[];
  note: string;
};

