import React, { Component } from 'react';
import {
    PieChart, Pie, LabelList, Cell,
} from 'recharts';

class Breakdown extends Component {
    sum = (category) => {
        let transactions_to_display = this.props.transactions_to_display
        let sum = 0
        for (let t of transactions_to_display) {
            if (t.category === category) {
                sum += t.amount
            }
        }
        return sum
    }


    render() {
        let categories = this.props.categories
        let data = categories.map(c => { return { category: c, sum: this.sum(c) } })

        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

        const RADIAN = Math.PI / 180
        const renderCustomizedLabel = ({
            cx, cy, midAngle, innerRadius, outerRadius, percent, index,
        }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5
            const x = cx + radius * Math.cos(-midAngle * RADIAN)
            const y = cy + radius * Math.sin(-midAngle * RADIAN)
            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

        return (
            <div id="breakdown">
                    <table>
                        <thead><tr><td>Category</td><td>Sum</td></tr></thead>
                        {categories.map(c => <tr key={categories.indexOf(c)}><td>{c}:</td> <td>{this.sum(c)}</td></tr>)}
                    </table>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="sum"
                        >
                            {
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                            <LabelList dataKey="category" position="outside" />
                        </Pie>
                    </PieChart>
            </div>
        )
    }

}


export default Breakdown

