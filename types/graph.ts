type Datasets = {
  label?: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string | string[];
  borderColor?: string;
  hoverBackgroundColor?: string | string[];
  lineTension?: number;
  borderDashOffset?: number;
  pointBorderColor?: string;
  pointBackgroundColor?: string;
  pointBorderWidth?: number;
  pointHoverRadius?: number;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
  pointHoverBorderWidth?: number;
  pointRadius?: number;
  pointHitRadius?: number;
};

export interface GraphData {
  labels: string[];
  datasets: Datasets[];
}
