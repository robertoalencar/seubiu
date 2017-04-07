package br.com.orube.client.util;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.TextView;

import br.com.orube.client.R;

/**
 * Created by arthur on 23/09/16.
 */
public class CustomAdapter extends ArrayAdapter<Model> {

    Model[] modelItems = null;
    Context context;

    private View.OnClickListener imageClickListener = new View.OnClickListener()
    {

        @Override
        public void onClick(View v)
        {
            Log.i( "", v + "");
        }
    };

    public Model[] getModelItems() {
        return modelItems;
    }

    public CustomAdapter(Context context, Model[] resource) {
        super(context, R.layout.row,resource);
        // TODO Auto-generated constructor stub
        this.context = context;
        this.modelItems = resource;
    }
    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        // TODO Auto-generated method stub
        LayoutInflater inflater = ((Activity)context).getLayoutInflater();
        convertView = inflater.inflate(R.layout.row, parent, false);
        TextView name = (TextView) convertView.findViewById(R.id.textView1);
        CheckBox cb = (CheckBox) convertView.findViewById(R.id.checkBox1);
        cb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if( modelItems[position].getValue() ){
                    modelItems[position].setValue( false );
                }else{
                    modelItems[position].setValue( true );
                }
            }
        });
        name.setText(modelItems[position].getName());
        if(modelItems[position].getValue() )
            cb.setChecked(true);
        else
            cb.setChecked(false);
        return convertView;
    }
}
