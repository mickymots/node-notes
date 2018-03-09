package com.hmrc.itmp.beans;

import java.util.List;

public class ReferenceDataResult {
	
	public List<ReferenceData> data;

	public List<ReferenceData> getData() {
		return data;
	}

	public void setData(List<ReferenceData> data) {
		this.data = data;
	}

	public ReferenceDataResult(List<ReferenceData> data) {
		super();
		this.data = data;
	}	
}
