package br.com.orube.client.util;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import br.com.orube.client.R;

public class ProfessionalEvaluationAdapter extends RecyclerView.Adapter<ProfessionalEvaluationAdapter.ViewHolder> {

    public TextView mTextView;
    private String[] mDataset;


    public static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView nome;

        public ViewHolder(View v) {
            super(v);
            nome = (TextView)v.findViewById(R.id.txtNomes);
        }
    }
    // Provide a suitable constructor (depends on the kind of dataset)
    public ProfessionalEvaluationAdapter(String[] myDataset) {
        mDataset = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public ProfessionalEvaluationAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_professional_evaluation, parent, false);

        ViewHolder vh = new ViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        holder.nome.setText( mDataset[position] );

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.length;
    }
}

